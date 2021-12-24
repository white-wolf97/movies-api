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
                    res.status(500).json({message: 'Internal server error!'});
                });
        }
    }

    addFavorite(req, res){
        try{
            const email = req.user.email;
            const movie = req.body.movie;
            if(!movie){
                res.status(409).json({message: 'Movie cannot be empty!'});
                return;
        }
        if(Movie.add(email, movie)){
            res.status(200).json({message: 'Successfully added to favorites!'});
        }
        else{
            res.status(409).json({message: 'Could not add: the movie was already added to favorites!'});
        }
      }
      catch(err){
          console.log(err);
          console.log(err.stack);
          res.status(500).json({message: 'Internal server error!'});
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
            if(favorites.length !== 0){
                let result = favorites.filter(e => {return e.emails.hasOwnProperty(email);});
                result = result.map((element) => {
                    element.addedAt = element.emails[email];
                    element.suggestionForTodayScore = Math.floor(Math.random() * 99);
                    return element;
                }).sort(compare);
                result.forEach(element => delete element.emails);
                console.log(result);
                if(result.length !== 0)
                    return res.send(result);
            }
            return res.json({message: 'You have no favorite movies!'});
        }
        catch(err){
            console.log(err);
            console.log(err.stack);
            res.status(500).json({message: 'Internal server error!'});
        }
    }
}