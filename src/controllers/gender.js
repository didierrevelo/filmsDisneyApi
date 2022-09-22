const { GenderModels } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');
const {
  filtered,
  filteredASC,
  filteredDESC
} = require('../utils/handleFilter');


/**
 * 
 * get all items
 */

const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await GenderModels.findByAllData({});
    let GendersFiltered = data;
    if (data.length > 0) {
      GendersFiltered = await filtered(res, req, data);
    }
    if (req.query.order === 'ASC') {
      GendersFiltered = await filteredASC(res, req, data);
    }
    else if (req.query.order === 'DESC') {
      GendersFiltered = await filteredDESC(res, req, data);
    }
    res.send({ GendersFiltered });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS")
  }
};

/**
 * 
  * get one item
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await GenderModels.findOneData(id);
    res.send({ data });
  } catch (error) {
    console.log(error)
    handleHttpError(res, "ERROR_GET_ITEM")
  }

};

/**
 * create one item
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await GenderModels.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM")
  }
};

/**
 * 
  * update one item
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await GenderModels.updateData(
      id, body
    );
    res.send({ data });
  } catch (error) {
    console.log(error)
    handleHttpError(res, "ERROR_UPDATE_ITEM")
  }
};

/**
 * delete one item
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await GenderModels.deleteData(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM")
  }
};


module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
