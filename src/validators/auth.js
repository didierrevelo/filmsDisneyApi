const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');


const validatorRegister = [
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Name is required'),
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Email is required'),
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 6, max: 16 })
    .withMessage('Password is required'),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

const validatorLogin = [
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Email is required'),
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 6, max: 16 })
    .withMessage('Password is required'),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

module.exports = {
  validatorRegister,
  validatorLogin
};
