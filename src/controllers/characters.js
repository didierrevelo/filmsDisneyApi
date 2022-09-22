const { CharacterModels } = require('../models');
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
    const data = await CharacterModels.findByAllData({});
    let CharactersFiltered = data;
    if (data.length > 0) {
      CharactersFiltered = await filtered(res, req, data);
    }
    if (req.query.order === 'ASC') {
      CharactersFiltered = await filteredASC(res, req, data);
    }
    else if (req.query.order === 'DESC') {
      CharactersFiltered = await filteredDESC(res, req, data);
    }
    res.send({ CharactersFiltered });
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
    const data = await CharacterModels.findOneData(id)
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
    const data = await CharacterModels.create(body);
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
    const data = await CharacterModels.updateData(
      id , body
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
    const deleteResponse = await CharacterModels.deleteData(id);
    const data = {
      deleted: deleteResponse
    }
    res.send({ data });
  } catch (error) {
    console.log(error)
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
