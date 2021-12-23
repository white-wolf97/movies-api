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
 * /api/v1/movies/list:
 *   get: 
 *     description: Gets random movies (if no keyword is specified) or the matching ones (if the keyword is specified) 
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: false
 *         description: The keyword used to filter results
 *         schema:
 *           type: string
 *     responses:  
 *       200: 
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   adult:
 *                     type: boolean
 *                     example: false
 *                   backdrop_path:
 *                     type: string
 *                     example: /cinER0ESG0eJ49kXlExM0MEWGxW.jpg
 *                   genre_ids:
 *                      type: array
 *                      items: 
 *                          type: integer
 *                   id:
 *                      type: integer
 *                      example: 566525
 *                   original_language:
 *                      type: string
 *                      example: en
 *                   original_title:
 *                      type: string
 *                      example: Shang-Chi and the Legend of the Ten Rings
 *                   overview:
 *                      type: string
 *                      example: Adaptación cinematográfica del héroe creado por Steve Englehart
 *                   popularity: 
 *                      type: float
 *                      example: 3100.52
 *                   poster_path:
 *                      type: string
 *                      example: /9VqajJXm29uprSaxOcEh7O0d6E9.jpg
 *                   release_date: 
 *                      type: string
 *                      example: 2021-09-01
 *                   title: 
 *                      type: string
 *                      example: Shang-Chi y la leyenda de los Diez Anillos
 *                   video:
 *                      type: boolean
 *                      example: false
 *                   vote_average: 
 *                      type: float   
 *                      example: 7.8
 *                   vote_count: 
 *                      type: integer
 *                      example: 4426
 *                   suggestionScore:
 *                      type: integer
 *                      example: 3
 *       500:
 *         description: internal server error 
 *       401:
 *         description: unauthorized
 *   
 */  
movieRouter.get('/list', authenticateToken, movieController.getMovies);


/** 
 * @openapi 
 * /api/v1/movies/addFavorite:
 *   post: 
 *     description: Adds the movie to the user's favorites list. 
 *     requestBody:
 *       description: The movie to add to favorites
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie: 
 *                 type: object
 *                 properties:
*                    adult:
*                      type: boolean
*                      example: false
*                    backdrop_path:
*                      type: string
*                      example: /cinER0ESG0eJ49kXlExM0MEWGxW.jpg
*                    genre_ids:
*                      type: array
*                      items: 
*                        type: integer
*                    id:
*                      type: integer
*                      example: 566525
*                    original_language:
*                      type: string
*                      example: en
*                    original_title:
*                      type: string
*                      example: Shang-Chi and the Legend of the Ten Rings
*                    overview:
*                      type: string
*                      example: Adaptación cinematográfica del héroe creado por Steve Englehart
*                    popularity: 
*                      type: float
*                      example: 3100.52
*                    poster_path:
*                      type: string
*                      example: /9VqajJXm29uprSaxOcEh7O0d6E9.jpg
*                    release_date: 
*                      type: string
*                      example: 2021-09-01
*                    title: 
*                      type: string
*                      example: Shang-Chi y la leyenda de los Diez Anillos
*                    video:
*                      type: boolean
*                      example: false
*                    vote_average: 
*                      type: float   
*                      example: 7.8
*                    vote_count: 
*                      type: integer
*                      example: 4426
*                    suggestionScore:
*                      type: integer
*                      example: 3
 *     responses:  
 *       200: 
 *         description: Successfully added to favorites!
 *       500:
 *         description: internal server error 
 *       401:
 *         description: unauthorized
 *       409:
 *         description: Could not add, the movie was already added to favorites!
 *   
 */  
movieRouter.post('/addFavorite', authenticateToken, movieController.addFavorite);

movieRouter.get('/getFavorites', authenticateToken, movieController.getFavorites);

const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.post('/logout',authenticateToken, authController.logout);

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp )

module.exports = {movieRouter, authRouter, userRouter};