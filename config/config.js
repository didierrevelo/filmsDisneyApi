require("dotenv").config();
const { Sequelize } = require("sequelize");

/**
 * initialize the environment variables for the connection to the database
 *
 */
const database = process.env.NAME_DB;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = process.env.DIALECT;

/**
 * set the information about the connection to the database
 */
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

module.exports = {sequelize};
