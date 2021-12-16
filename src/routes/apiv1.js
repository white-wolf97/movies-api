const express = require('express');
const MovieController = require('../controllers/movieController.js');

const movieController = new MovieController();

const apiV1Router = express.Router();

apiV1Router.get('/api/v1/movies/:keyword', movieController.getMovies);

module.exports = apiV1Router;