const express = require('express');
const MovieController = require('../controllers/movieController.js');
const UserController = require('../controllers/userController.js');

const movieController = new MovieController();
const userController = new UserController();

const movieRouter = express.Router();

movieRouter.get('/:keyword', movieController.getMovies);

const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
    res.send("ok!");
});

authRouter.post('/logout', (req, res) => {
    res.send("ok!");
});

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp )

module.exports = {movieRouter, authRouter, userRouter};