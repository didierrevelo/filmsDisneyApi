const express = require('express');
const { logCtrl, registerCtrl } = require('../controllers/auth');
const router = express.Router();
const { validatorRegister, validatorLogin } = require('../validators/auth');


/**
 * http://localhost:3000/filmsDisneyApi
 * Route to register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Register new user"
 *          description: "this route is to register new user"
 *          requestBody:
 *              content:
 *                  application/json; charset=utf-8:
 *                     schema:
 *                         $ref: '#/components/schemas/authRegister'
 *          responses:
 *                  '201':
 *                      description: "created user object"
 *                      content:
 *                         application/json:
 *                            schema:
 *                              $ref: '#/components/schemas/authRegister'
 *                  '403':
 *                      description: "ERROR_REGISTERING_USER"
 * 
 */
router.post('/register', validatorRegister, registerCtrl);




/**
 * http://localhost:3000/filmsDisneyApi
 * Route to register new user
 * @openapi
 * /auth/login:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Login user"
 *          description: "This route is used to start the session and
 *                        returns an object with the start information and the token.
 *                        This session token should be used to authenticate the session
 *                        from the rest of the application."
 *          requestBody:
 *              content:
 *                  application/json; charset=utf-8:
 *                     schema:
 *                         $ref: '#/components/schemas/authLogin'
 *          responses:
 *                  '201':
 *                      description: "logged user object, includes login token, user id and role."
 *                      content:
 *                        application/json:
 *                          schema:
 *                            type: array
 *                            items:
 *                                 $ref: '#/components/schemas/authLogin'
 *                  '404':
 *                      description: "USER_NOT_FOUND"
 */
router.post('/login', validatorLogin, logCtrl);


module.exports = router;
