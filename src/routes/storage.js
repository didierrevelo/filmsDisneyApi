const express = require('express');
const router = express.Router();
const upload = require('../utils/handleStorage');
const authMidleware = require('../middleware/session');
const {
  validatorGetItem
} = require('../validators/storage');
const {
  getItem,
  getItems, 
  deleteItem,
  createItem
} = require('../controllers/storage');


const Storage = require('../models/nosql/storage');
const checkRol = require('../middleware/rol');

//TODO http://localhost:3000/storage- GET, POST, DELETE


/**
 * Get all storages
 * @openapi
 * /storage:
 *    get:
 *      tags:
 *        - storage
 *      summary: "get all files in storage"
 *      description: "this route is to get all files in storage"
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: return all files in storage
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/storage'
 *        '403':
 *          description: "UNAUTHORIZED"
 */
router.get('/', authMidleware, getItems);

/**
 * Get detail from storage
 * @openapi
 * /storage/{id}:
 *    get:
 *      tags:
 *        - storage
 *      summary: "get one  from storage"
 *      description: "this route is to get one file from storage"
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: "ID of the file to return"
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: "return one file from storage"
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/storage'
 *        '422':
 *          description: "UNAUTHORIZED"
 */
router.get('/:id', authMidleware, validatorGetItem, getItem);

/**
 * Upload file
 * @openapi
 * /storage:
 *    post:
 *      tags:
 *        - storage
 *      summary: "Upload file"
 *      description: "Upload file"
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myfile:
 *                 type: string
 *                 format: binary
 *      responses:
 *            '201':
 *                description: "Returns the object inserted in the collection with status '201'"
 *            '403':
 *                description: "UNAUTHORIZED"
 */
router.post('/', authMidleware, upload.single('myfile'), createItem);

/**
 * Delete storage
 * @openapi
 * /storage/{id}:
 *    delete:
 *      tags:
 *        - storage
 *      summary: "delete one file from storage"
 *      description: "delete one file from storage"
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: "ID of the file to delete"
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: "return the object of the file to delete"
 *        '422':
 *          descriptio n: "UNAUTHORIZED"
 */
router.delete('/:id', authMidleware, checkRol(["admin", "user"]), validatorGetItem, deleteItem);


module.exports = router;
