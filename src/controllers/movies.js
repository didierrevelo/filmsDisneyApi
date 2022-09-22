const { MovieModels } = require('../models');
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
    const data = await MovieModels.findByAllData({});
    let moviesFiltered = data;
    if (data.length > 0) {
      moviesFiltered = await filtered(res, req, data);
    } 
    if (req.query.order === 'ASC') {
      moviesFiltered = await filteredASC(res, req, data);
    }
    else if(req.query.order === 'DESC') {
      moviesFiltered = await filteredDESC(res, req, data);
    }
    res.send({moviesFiltered});
  } catch (error) {
    console.log(error);
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
    const data = await MovieModels.findOneData(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM")
  }

};

/**
 * create one item
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await MovieModels.create(body);
    res.send({ data });
  } catch (error) {
    console.log(error)
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
    const data = await MovieModels.updateData(
      id, body
    );
    res.send({ data });
  } catch (error) {
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
    const data = await MovieModels.deleteData(id);
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
