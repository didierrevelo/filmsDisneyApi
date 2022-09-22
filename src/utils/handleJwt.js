const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const getProperties = require('./handlePropertiesEngine');
const propertiesKey = getProperties();


const tokenSign = async (user) => {
  const sign = await jwt.sign({
    [propertiesKey.id]: user[propertiesKey.id],
    role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: '1d'
    }
  );
  return sign;
};

const verifyToken = async ( tokenJwt) => {
  try {
    return await jwt.verify(tokenJwt , JWT_SECRET);
  } 
  catch (error) {
    return null;
  }
};

module.exports = {
  tokenSign,
  verifyToken
};
