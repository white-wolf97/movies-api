const config = require('../config');
const axios = require('axios');
const Movie = require('../models/movie.js');

const getMovies = (req, res) => {
    const keyword = req.query.keyword;
    if (keyword && !/^\s*$/.test(keyword)) {
        const params = new URLSearchParams([['api_key', config.apiKey], ['language', 'es-SP'], ['query', keyword], ['page', 1], ['include_adult', false]]);

        axios.get('https://api.themoviedb.org/3/search/movie', { params })
            .then((response) => {
                res.json({ status: 'success', data: response.data.results });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ status: 'error', data: { message: 'Internal server error!' } });
            });
    }
    else {
        const params = new URLSearchParams([['api_key', config.apiKey], ['language', 'es-SP'], ['page', 1]]);

        axios.get('https://api.themoviedb.org/3/movie/popular', { params })
            .then((response) => {

                res.json({ status: 'success', data: response.data.results });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ status: 'error', data: { message: 'Internal server error!' } });
            });
    }
}

const addFavorite = async (req, res) => {
    try {
        const email = req.user.email;
        const movie = req.body.movie;
        if (!movie) {
            res.status(409).json({ status: 'fail', data: { message: 'Movie cannot be empty!' } });
            return;
        }
        let movieDb = await Movie.findOne({ id: movie.id })

        if (movieDb) {
            if (movieDb.emailsAndDates.find(e => e.email === email)) {
                return res.status(409).json({ status: 'fail', data: { message: 'Could not add: the movie was already added to favorites!' } });
            }
            else {
                movieDb.emailsAndDates = [...movieDb.emailsAndDates, { email, date: Date.now() }]
                await movieDb.save();
                return res.status(200).json({ status: 'success', data: { message: 'Successfully added to favorites!' } });
            }
        }
        movieDb = new Movie(movie);
        movieDb.emailsAndDates = [{ email, date: Date.now() }];
        await movieDb.save();
        return res.status(200).json({ status: 'success', data: { message: 'Successfully added to favorites!' } });
    }
    catch (err) {
        console.log(err.message);
        console.log(err.stack);
        res.status(500).json({ status: 'error', data: { message: 'Internal server error!' } });
    }
}

const getFavorites = async (req, res) => {
    try {
        const email = req.user.email;
        let favorites = await Movie.find();

        if (favorites.length === 0) {
            return res.json({ status: 'success', data: [] });
        }

        favorites = favorites.filter(e => {
            return !!e.emailsAndDates.find(emailAndDate => emailAndDate.email === email);
        });

        favorites = favorites.map((movie) => {
            const { date } = movie.emailsAndDates.find(e => e.email === email);
            movie.addedAt = date;
            return movie;
        });

        favorites.forEach(element => {
            element.emailsAndDates = undefined;
            element.__v = undefined;
        });

        res.json({ status: 'success', data: favorites });
    }
    catch (err) {
        console.log(err.message);
        console.log(err.stack);
        res.status(500).json({ status: 'error', data: { message: 'Internal server error!' } });
    }
}

module.exports = { getMovies, addFavorite, getFavorites }