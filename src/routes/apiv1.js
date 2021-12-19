const express = require('express');
const authenticateToken = require('../middleware/authenticateToken.js')
const MovieController = require('../controllers/movieController.js');
const UserController = require('../controllers/userController.js');
const AuthController = require('../controllers/authController.js')

const movieController = new MovieController();
const userController = new UserController();
const authController = new AuthController();

const movieRouter = express.Router();

movieRouter.get('/:keyword?', authenticateToken, movieController.getMovies);

const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.post('/logout',authenticateToken, authController.logout);

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp )

module.exports = {movieRouter, authRouter, userRouter};