const config = require('../config');
const axios = require('axios');
const Movie = require('../models/movie.js');

module.exports = class MovieController {
    getMovies(req, res) {
        const keyword = req.query.keyword;
        if(keyword){
            const params = new URLSearchParams([['api_key', config.apiKey], ['language', 'es-SP'], ['query', keyword], ['page',1], ['include_adult', false]]);
        
            axios.get('https://api.themoviedb.org/3/search/movie', { params })
                .then( (response) => {
                  
                    function compare( a, b ) {
                        if ( a.suggestionScore < b.suggestionScore ) {
                            return -1;
                        }
                        if ( a.suggestionScore > b.suggestionScore ) {
                            return 1;
                        }
                        return 0;
                    }
                    
                    const resultsList = response.data.results.map( (result) => {
                        result.suggestionScore = Math.floor(Math.random() * 99);
                        return result;
                      }).sort(compare);
                    res.send(resultsList);
                })
                .catch( (error) => {
                    console.log(error);
                });  
        }
        else{
            const params = new URLSearchParams([['api_key', config.apiKey], ['language', 'es-SP'],  ['page',1]]);
        
            axios.get('https://api.themoviedb.org/3/movie/popular', { params })
                .then( (response) => {
                  
                    function compare( a, b ) {
                        if ( a.suggestionScore < b.suggestionScore ) {
                            return -1;
                        }
                        if ( a.suggestionScore > b.suggestionScore ) {
                            return 1;
                        }
                        return 0;
                    }
                    
                    const resultsList = response.data.results.map( (result) => {
                        result.suggestionScore = Math.floor(Math.random() * 99);
                        return result;
                      }).sort(compare);
                    res.send(resultsList);
                })
                .catch( (error) => {
                    console.log(error);
                    res.status(500).send('Internal server error!');
                });
        }
    }

    addFavorite(req, res){
        try{
            const email = req.user.email;
            const movie = req.body.movie;
            if(!movie){
                res.send('Movie cannot be empty!');
                return;
        }
        if(Movie.add(email, movie)){
            res.status(201).send('Successfully add to favorites!');
        }
        else{
            res.status(409).send('Could not add: the movie was already added to favorites!');
        }
      }
      catch(err){
          console.log(err);
          console.log(err.stack);
          res.status(500).send('Internal server error!');
      }
    }

    getFavorites(req, res){
        function compare( a, b ) {
            if ( a.suggestionForTodayScore < b.suggestionForTodayScore ) {
                return -1;
            }
            if ( a.suggestionForTodayScore > b.suggestionForTodayScore ) {
                return 1;
            }
            return 0;
        }

        try{
            const email = req.user.email;
            const favorites = Movie.getDB();
            console.log(favorites);
            if(favorites !== []){
                let result = favorites.filter(e => {return e.emails.hasOwnProperty(email);});
                result = result.map((element) => {
                    element.addedAt = element.emails[email];
                    element.suggestionForTodayScore = Math.floor(Math.random() * 99);
                    return element;
                }).sort(compare);
                result.forEach(element => delete element.emails);
                if(result !== [])
                    return res.send(result);
            }
            return res.send('You have no favorite movies!');
        }
        catch(err){
            console.log(err);
            console.log(err.stack);
            res.status(500).send('Internal server error!');
        }
    }
}