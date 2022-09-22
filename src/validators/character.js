const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateItem = [
  check('Name')
    .exists()
    .notEmpty()
    .withMessage('Name is required'),
  check('Age')
    .exists()
    .notEmpty()
    .withMessage('Age is required'),
  check('Weight')
    .exists()
    .notEmpty()
    .withMessage('Weight is required'),
  check('History')
    .exists()
    .notEmpty()
    .withMessage('History is required'),
  check('Movie')
    .exists()
    .notEmpty()
    .withMessage('Movie is required'),
  check('mediaId')
    .exists()
    .notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

const validatorGetItem = [
  check('id')
    .exists()
    .notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

module.exports = {
  validatorCreateItem,
  validatorGetItem
};
