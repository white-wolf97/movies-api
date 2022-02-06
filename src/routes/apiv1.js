const express = require('express');
const authenticateToken = require('../middleware/authenticateToken.js');
const { login, logout } = require('../controllers/auth.js');
const signUp = require('../controllers/user.js');
const { getMovies, addFavorite, getFavorites } = require('../controllers/movie.js');

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
 *       500:
 *         description: internal server error 
 *       401:
 *         description: unauthorized
 *   
 */
movieRouter.get('/list', authenticateToken, getMovies);


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
movieRouter.post('/addFavorite', authenticateToken, addFavorite);


/** 
 * @openapi 
 * /api/v1/movies/getFavorites:
 *   get: 
 *     description: Returns the user's favorite movies
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
 *                   addedAt:
 *                      type: integer
 *                      example: 1640210315987
 *       500:
 *         description: internal server error 
 *       401:
 *         description: unauthorized
 *   
 */
movieRouter.get('/getFavorites', authenticateToken, getFavorites);

const authRouter = express.Router();

/** 
 * @openapi 
 * /api/v1/auth/login:
 *   post: 
 *     description: Tries to login with the given credentials 
 *     requestBody:
 *       description: The user's credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*                email:
*                  type: string
*                  example: email1@gmail.com
*                password:
*                  type: string
*                  example: 1223423fds!
 *     responses:  
 *       200: 
 *         description: Successfully logged in!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbzIiL
 *       500:
 *         description: internal server error 
 *       401:
 *         description: wrong password
 *       409:
 *         description: There is not a registered user with the email in the database
 *   
 */
authRouter.post('/login', login);


/** 
 * @openapi 
 * /api/v1/auth/logout:
 *   post: 
 *     description: Tries to log out the given token
 *     responses:  
 *       200: 
 *         description: Successfully logged out!
 *       500:
 *         description: internal server error 
 *       401:
 *         description: unauthorized
 *   
 */
authRouter.post('/logout', authenticateToken, logout);

const userRouter = express.Router();


/** 
 * @openapi 
 * /api/v1/users/signup:
 *   post: 
 *     description: Signs up a new user with the given data
 *     requestBody:
 *       description: User info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*                email:
*                  type: string
*                  example: email1@gmail.com
*                firstName:
*                  type: string
*                  example: Adolfo
*                lastName:
*                  type: string
*                  example: Castelo
*                password:
*                  type: string
*                  example: 1223423fds!
 *     responses:  
 *       201: 
 *         description: Successfully signed up!
 *       500:
 *         description: internal server error 
 *       409:
 *         description: There is already an user with the email
 *   
 */
userRouter.post('/signup', signUp)

module.exports = { movieRouter, authRouter, userRouter };