const config = require('../config');
const axios = require('axios');

module.exports = class MovieController {
    getMovies(req, res) {
        let keyword = req.params.keyword;
        const params = new URLSearchParams([['api_key', config.apiKey], ['language', 'es-SP'], ['query', keyword], ['page',1], ['include_adult', false]]);
        
        axios.get('https://api.themoviedb.org/3/search/movie', { params })
            .then( (response) => {
                res.send(response.data.results);
            })
            .catch( (error) => {
                console.log(error);
            });
    }
}