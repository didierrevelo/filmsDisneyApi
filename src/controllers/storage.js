const fs = require('fs');
const { StorageModels } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');


const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * 
 * get all items
 */

const getItems = async (req, res) => {
  try {
    const data = await StorageModels.findByAllData({});
    res.send({ data });
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
    const data = await StorageModels.findOneData(id);
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_ITEM")
  }

};

/**
 * create one item
 */
const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await StorageModels.create(fileData);
    res.status(201);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM")
  }
};

/**
 * delete one item
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await StorageModels.findOneData(id);
    await StorageModels.deleteData(id);
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlinkSync(filePath);

    const data = {
      filePath,
      deleted: 1,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM")
  }
};


module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem
};
