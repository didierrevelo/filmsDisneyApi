const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateItem = [
  check('Title')
    .exists()
    .notEmpty()
    .withMessage('Title is required'),
  check('Date')
    .exists()
    .notEmpty()
    .withMessage('Date is required'),
  check('Score')
    .exists()
    .notEmpty()
    .withMessage('Score is required'),
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
