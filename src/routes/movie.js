const express = require('express');
const router = express.Router();
const authMidleware = require('../middleware/session');
const {
  validatorCreateItem,
  validatorGetItem
} = require('../validators/movies');
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/movies');


const Movie = require('../models/nosql/movies');
const checkRol = require('../middleware/rol');

//TODO http://localhost:3000/movie- GET, POST, PUT, DELETE

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to get all movies
 * @openapi
 * /movie:
 *     get:
 *        tags:
 *           - movies
 *        summary: "get all movies"
 *        description: "this route is used to get all movies,
 *                      you need to be logged in and use the session
 *                      token in Authorize."
 *        security:
 *          - bearerAuth: []
 *        responses:
 *            '200':
 *                description: "return a list of all movies"
 *            '422':
 *               description: "UNAUTHORIZED"
*/

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to get movie by Title
 * @openapi
 * /movie?{parameters}={value}:
 *    get:
 *      tags:
 *       - movies
 *      summary: "get movie by Title"
 *      description: "this route is used to get one movie by title,
 *                    you need to be logged in and use the session
 *                   token in Authorize."
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name : Parameters
 *          in: path
 *          description: "parameter of movie to return example: Title, Date, Score"
 *          required: true
 *        - name : value
 *          in: path
 *          description: "value of movie to search example: Toy Story, 1995-11-22, 8.3"
 *          required: true
 *          responses:
 *           '200':
 *               description: "OK"
 *          '403':
 *               description: "UNAUTHORIZED"
*/
router.get('/', authMidleware, getItems);

/** 
 * http://localhost:3000/filmsDisneyApi
 * Route to get movie by id
 * @openapi
 * /movie/{id}:
 *   get:
 *    tags:
 *     - movies
 *    summary: "get movie by id"
 *    description: "this route is used to get one movie by id,
 *                  you need to be logged in and use the session
 *                  token in Authorize."
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - name : id
 *       in: path
 *       description: "id of movie to return"
 *       required: true
 *    responses:
 *            '200':
 *               description: "OK"
 *            '422':
 *               description: "UNAUTHORIZED"
*/
router.get('/:id', authMidleware, validatorGetItem, getItem);

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to create movie
 * @openapi
 * /movie:
 *   post:
 *    tags:
 *     - movies
 *    summary: "create movie"
 *    description: "this route is used to create a movie,
 *                  you need to be logged in and use the session
 *                  token in Authorize."
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *       content:
 *         application/json; charset=utf-8:
 *           schema:
 *             $ref: '#/components/schemas/movies'
 *    responses:
 *            '200':
 *               description: "OK"
 *            '422':
 *               description: "UNAUTHORIZED"
 */
router.post('/', authMidleware, checkRol(["admin", "user"]), validatorCreateItem, createItem);

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to update movie
 * @openapi
 * /movie/{id}:
 *   put:
 *    tags:
 *     - movies
 *    summary: "update movie"
 *    description: "this route is used to update a movie,
 *                  you need to be logged in and use the session
 *                  token in Authorize."
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - name : id
 *       in: path
 *       description: "id of movie to update"
 *       required: true
 *    requestBody:
 *       content: 
 *         application/json; charset=utf-8:
 *           schema:
 *             $ref: '#/components/schemas/movies'
 *    responses:
 *           '200':
 *               description: "OK"
 *           '422':
 *               description: "UNAUTHORIZED"
 *           '404':
 *               description: "NOT FOUND"
 */
router.put('/:id', authMidleware, checkRol(["admin", "user"]), validatorGetItem, validatorCreateItem, updateItem);

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to delete movie
 * @openapi
 * /movie/{id}:
 *      delete:
 *          tags:
 *             - movies
 *          summary: "delete movie"
 *          description: "this route is used to delete a movie,
 *                        you need to be logged in and use the session
 *                        token in Authorize."
 *          security:
 *            - bearerAuth: []
 *          parameters:
 *            - name : id
 *              in: path
 *              description: "id of movie to delete"
 *              required: true
 *          responses:
 *            '200':
 *               description: "OK"
 *            '422':
 *                description: "UNAUTHORIZED"
*/
router.delete('/:id', authMidleware, checkRol(["admin", "user"]), validatorGetItem, deleteItem);


module.exports = router;
