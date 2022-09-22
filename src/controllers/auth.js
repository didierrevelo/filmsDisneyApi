const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');
const { tokenSign } = require('../utils/handleJwt');
const { encrypt, decrypt } = require('../utils/handlePassword');
const { UsersModels } = require('../models');
const sendEmail = require('../utils/handleSendEmail');



const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const hashPassword = await encrypt(req.password);
    const body = { ...req, password: hashPassword };
    const dataUser = await UsersModels.create(body);
    dataUser.set('password', undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,

    }
    res.status(201);
    res.send({ data });

    try {
      const text = "successful user registration";
      await sendEmail(dataUser.email, text, dataUser.name);
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_REGISTERING_USER");

  }
};

const logCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const dataUser = await UsersModels.findOne({ email: req.email });
    if (!dataUser) {
      handleHttpError(res, "USER_NOT_FOUND", 404);
      return;
    }

    const hashPassword = await dataUser.get('password');
    const check = await decrypt(req.password, hashPassword);
    
    if (!check) {
      handleHttpError(res, "WRONG_PASSWORD", 401);
      return;
    }

    dataUser.set('password', undefined, { strict: false });
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    }

    res.status(201).send({ data });
    try {
      const text = "se ha logueado en nuestra plataforma";
      await sendEmail(dataUser.email, text, dataUser.name);
    } catch (err) {
      console.error(err);
    }

  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = {
  registerCtrl,
  logCtrl

}
