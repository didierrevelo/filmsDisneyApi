const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateItem = [
  check('Name')
    .exists()
    .notEmpty()
    .withMessage('Name is required'),
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