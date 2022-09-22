const express = require('express');
const router = express.Router();
const authMidleware = require('../middleware/session');
const {
  validatorCreateItem,
  validatorGetItem
} = require('../validators/character');
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/characters');


const Character = require('../models/nosql/characters');
const checkRol = require('../middleware/rol');

//TODO http://localhost:3000/characters- GET, POST, PUT, DELETE

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to get all characters
 * @openapi
 * /characters:
 *      get:
 *          tags:
 *              - characters
 *          summary: "get all characters"
 *          description:
 *                "this route is to get all the characters,
 *                 you need to be logged in and use the session
 *                 token in Authorize."
 *          security:
 *            - bearerAuth: []
 *          responses:
 *                  '200':
 *                      description: "returns an object with the information of the character, in addition to the image object that is obtained by uploading a file in the post path of the storage and putting its ID in the mediaId of the character object."
 *                  '422':
 *                      description: "UNAUTHORIZED"
 * 
 */

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to get one characters by name
 * @openapi
 * /characters?{Parameter}={value}:
 *      get:
 *          tags:
 *              - characters
 *          summary: "get one characters by name"
 *          description:
 *                  " this route is to get one characters
 *                    by name, you need to be logged in
 *                    and use the session token in Authorize."
 *          security:
 *            - bearerAuth: []
 *          parameters:
 *          - name: Parameter
 *            in: path
 *            description: "search parameter of characters to return example: Name, Age, Weight, History, Movie"
 *            required: true
 *          - name: value
 *            in: path
 *            description: "value of characters to return"
 *            required: true
 *          responses:
 *                  '200':
 *                      description: "returns the character object or group of objects passed by reference"
 *                  '422':
 *                      description: "UNAUTHORIZED"
 * 
 */
router.get('/', authMidleware, getItems);

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to get one characters by id
 * @openapi
 * /characters/{id}:
 *      get:
 *          tags:
 *              - characters
 *          summary: "get one characters by id"
 *          description: "this route is to get one characters by id, 
 *                        you need to be logged in and use the session
 *                        token in Authorize."
 *          security:
 *            - bearerAuth: []
 *          parameters:
 *          - name: id
 *            in: path
 *            description: ID of characters to return
 *            required: true
 *          responses:
 *                  '200':
 *                      description: "OK"
 *                  '403':
 *                      description: "UNAUTHORIZED"
 * 
 */
router.get('/:id', authMidleware, validatorGetItem, getItem);

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to create one characters
 * @openapi
 * /characters:
 *      post:
 *          tags:
 *              - characters
 *          summary: "create one characters"
 *          description: "this route is to create one characters, 
 *                        you need to be logged in and use the
 *                        session token in Authorize, the mediaId
 *                        is obtained from uploading a file or image
 *                        in the Storage route, if this is not done
 *                        none of the get routes will show results,
 *                        since these are related."
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json; charset=utf-8:
 *                     schema:
 *                         $ref: '#/components/schemas/characters'
 *          responses:
 *                  '200':
 *                      description: "return the object of the character created"
 *                  '422':
 *                      description: "UNAUTHORIZED"
 * 
 */
router.post('/', authMidleware, checkRol(["admin", "user"]), validatorCreateItem, createItem);

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to update one characters
 * @openapi
 * /characters/{id}:
 *      put:
 *          tags:
 *              - characters
 *          summary: "update one characters by id"
 *          description: "this route is to get one characters by id, 
 *                        you need to be logged in and use the session
 *                        token in Authorize."
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json; charset=utf-8:
 *                     schema:
 *                         $ref: '#/components/schemas/characters'
 *          parameters:
 *          - name: id
 *            in: path
 *            description: ID of characters to return
 *            required: true
 *          responses:
 *                  '200':
 *                      description: "returns characters object updated"
 *                  '403':
 *                      description: "UNAUTHORIZED"
 * 
 */
router.put('/:id', authMidleware, checkRol(["admin", "user"]), validatorGetItem, validatorCreateItem, updateItem);

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to delete one characters
 * @openapi
 * /characters/{id}:
 *      delete:
 *          tags:
 *              - characters
 *          summary: "delete one characters by id"
 *          description: "this route is to get one characters by id, 
 *                       you need to be logged in and use the session
 *                      token in Authorize."
 *          security:
 *            - bearerAuth: []
 *          parameters:
 *          - name: id
 *            in: path
 *            description: ID of characters to return
 *            required: true
 *          responses:
 *                  '200':
 *                      description: "retruns the character object deleted"
 *                  '403':
 *                      description: "ERROR_UPDATE_ITEM"
 * 
 */
router.delete('/:id', authMidleware, checkRol(["admin", "user"]), validatorGetItem, deleteItem);


module.exports = router;
