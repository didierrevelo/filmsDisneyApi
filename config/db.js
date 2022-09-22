require("dotenv").config();
const { Sequelize } = require("sequelize");
/**
 * this is the default configuration for the conect to the database mysql
 */

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

/**
 * authenticate the connection to the database
 * if the connection is successful, the console will show the message
 * "Connection has been established successfully."
 *  and if the connection is not successful, the console will show the message
 * "Unable to connect to the database:"
 */
const dbConnectMysql = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      /**
       * force: true will drop the table if it already exists and create the new tables.
       * force: false will not drop the table if it already exists
       */
      force: false,
      alter: false,
    });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  dbConnectMysql,
  // createTable
};
