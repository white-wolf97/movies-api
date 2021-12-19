const config = require('../config');
const axios = require('axios');

module.exports = class MovieController {
    getMovies(req, res) {
        let keyword = req.params.keyword;
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
              });
        }
    }
}