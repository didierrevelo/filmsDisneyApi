require("dotenv").config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const openApiConfigration = require('./docs/swagger');
const morganBody = require('morgan-body');
const loggerStream = require('./src/utils/handleLogger');
const app = express();
const ENGINE_DB = process.env.ENGINE_DB;
const bodyParser = require('body-parser');
const { dbConnectMysql } = require('./config/db');
const dbConnect = require('./config/mongo');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('./src/storage'));


morganBody(app, {
    noColors: true,
    prettify: true,
    stream: loggerStream,
    skip: function (req, res) { 
      return res.statusCode < 400 
    }
});

const port = process.env.PORT_EXPRESS || 3000;

/**
 * define documentation path
 */

app.use("/documentation",
swaggerUI.serve,
swaggerUI.setup(openApiConfigration));

app.use('/filmsDisneyApi', require('./src/routes'));



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

(ENGINE_DB === 'mysql') ? dbConnectMysql() : dbConnect();
