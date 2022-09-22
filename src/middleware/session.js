const { handleHttpError } = require('../utils/handleError');
const { verifyToken } = require('../utils/handleJwt');
const { UsersModels } = require('../models');
const getProperties = require('../utils/handlePropertiesEngine');
const propertiesKey = getProperties();
const ENGINE_DB = process.env.ENGINE_DB;


const authMidleware = async (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      handleHttpError(res, 'UNAUTHORIZED', 401);
      return;
    }

    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    if(!dataToken) {
      handleHttpError(res, 'NOT_PAYLOAD_DATA', 401);
      return;
    }
    const queryNosql = {
      [propertiesKey._id]:dataToken[propertiesKey._id]
     }
     const queryMysql = {
      [propertiesKey.id]:dataToken[propertiesKey.id]
     }

    const query = ENGINE_DB === 'nosql' ? queryNosql : queryMysql;
    const user =  await UsersModels.findOne(query);   
    req.user = user;

    next();

  } catch(error) {
    handleHttpError(res, "LOGIN_REQUIRED", 401);
  }
};

module.exports = authMidleware;
