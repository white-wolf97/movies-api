const express = require('express');
const authenticateToken = require('../middleware/authenticateToken.js')
const MovieController = require('../controllers/movieController.js');
const UserController = require('../controllers/userController.js');
const AuthController = require('../controllers/authController.js')

const movieController = new MovieController();
const userController = new UserController();
const authController = new AuthController();

const movieRouter = express.Router();

/** 
 * @openapi 
 * /api/v1/movies/keyword?:
 *   get: 
 *     description: Gets random movies (if no keyword is specified) or the matching ones (if the keyword is specified) 
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: false
 *         description: The keyword used to filter results
 *         schema:
 *           type: string
 *     responses:  
 *       200: 
 *         description: Movies list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *       500:
 *         description: internal server error 
 *   
 */  
movieRouter.get('/list/:keyword?', authenticateToken, movieController.getMovies);

movieRouter.post('/addFavorite', authenticateToken, movieController.addFavorite);

movieRouter.get('/getFavorites', authenticateToken, movieController.getFavorites);

const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.post('/logout',authenticateToken, authController.logout);

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp )

module.exports = {movieRouter, authRouter, userRouter};