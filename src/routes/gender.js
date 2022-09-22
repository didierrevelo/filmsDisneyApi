const express = require("express");
const router = express.Router();
const authMidleware = require("../middleware/session");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/gender");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/gender");

const Gender = require("../models/nosql/gender");
const checkRol = require("../middleware/rol");

//TODO http://localhost:3000/gender- GET, POST, PUT, DELETE

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to get all gender
 * @openapi
 * /gender:
 *      get:
 *          tags:
 *              - gender
 *          summary: "get all gender"
 *          description: "this route is used to get all gender,
 *                        you need to be logged in and use the
 *                        session token in Authorize."
 *          security:
 *            - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: "return the of the genders storage"
 *              '403':
 *                  description: "UNAUTHORIZED"
 */

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to get gender by Parameters 
 * @openapi
 * /gender?{Parameter}={Name}:
 *      get:
 *          tags:
 *              - gender
 *          summary: "get gender by Name"
 *          description: 
 *                "this route is to get one characters by name
 *                 you need to be logged in and use the session
 *                 token in Authorize"
 *          security:
 *           - bearerAuth: []
 *          parameters:
 *          - name : Parameter
 *            in: path
 *            description: "Parameter of gender to return example: Name, Movie and mediaId"
 *            required: true
 *          - name : Name
 *            in: path
 *            description: "Name of gender to return"
 *            required: true
 *          responses:
 *                  '200':
 *                      description: "return the object of genders"
 *                  '403':
 *                      description: "UNAUTHORIZED"
 */
router.get("/", authMidleware, getItems);

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to get one gender by id
 * @openapi
 * /gender/{id}:
 *      get:
 *          tags:
 *              - gender
 *          summary: "get all gender"
 *          description: "this route is used to get one gender by id,
 *                        you need to be logged in and use the
 *                        session token in Authorize."
 *          security:
 *            - bearerAuth: []
 *          parameters:
 *          - name : id
 *            in: path
 *            description: "id of the gender you want to return"
 *            required: true
 *          responses:
 *              '200':
 *                  description: "return the gender objects"
 *              '422':
 *                  description: "UNAUTHORIZED"
 */
router.get("/:id", authMidleware, validatorGetItem, getItem);

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to create a new gender
 * @openapi
 * /gender:
 *      post:
 *          tags:
 *              - gender
 *          summary: "get all gender"
 *          description: "this route is used to create gender,
 *                        you need to be logged in and use the
 *                        session token in Authorize."
 *          security:
 *            - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json; charset=utf-8:
 *                     schema:
 *                         $ref: '#/components/schemas/gender'
 *          responses:
 *              '200':
 *                  description: "return the object of the gender created"
 *              '422':
 *                  description: "UNAUTHORIZED"
 */
router.post(
  "/",
  authMidleware,
  checkRol(["admin", "user"]),
  validatorCreateItem,
  createItem
);

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to update one characters by id
 * @openapi
 * /gender/{id}:
 *     put:
 *      tags:
 *          - gender
 *      summary: "get all gender"
 *      description: "this route is used to update one gender by id,
 *                    you need to be logged in and use the
 *                    session token in Authorize."
 *      security:
 *        - bearerAuth: []    
 *      requestBody:
 *          content:
 *              application/json; charset=utf-8:
 *                  schema:
 *                      $ref: '#/components/schemas/gender'
 *      parameters:
 *      - name: id
 *        in: path
 *        description: "ID of gender to update"
 *        required: true
 *      responses:
 *               '200':   
 *                   description: "return object of updated gender"   
 *               '422':   
 *                   description: "UNAUTHORIZED"
 * 
 */
router.put(
  "/:id",
  authMidleware,
  checkRol(["admin", "user"]),
  validatorGetItem,
  validatorCreateItem,
  updateItem
);

/**
 * http://localhost:3000/filmsDisneyApi
 * Route to delete one gender by id
 * @openapi
 * /gender/{id}:
 *      delete:
 *            tags:
 *                - gender
 *            summary: "delete one gender by id"
 *            description: "this route is used to delete,
 *                          you need to be logged in and use the session
 *                          token in Authorize."
 *            security:
 *             - bearerAuth: []
 *            parameters:
 *            - name : id
 *              in: path
 *              description: "id of gender to delete"
 *              required: true
 *            responses:
 *               '200':
 *                  description: "return the gender to deleted"
 *               '422':
 *                  description: "UNAUTHORIZED"
 */
router.delete(
  "/:id",
  authMidleware,
  checkRol(["admin", "user"]),
  validatorGetItem,
  deleteItem
);

module.exports = router;
