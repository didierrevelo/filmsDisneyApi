const { handleHttpError } = require("../utils/handleError");

const checkRol = (roles) => (req, res, next) => {
  try{
    const { user } = req;
    const rolByUser = user.role;
    // console.log(rolByUser);
    const checkValueRol = roles.some((rolSingle) => rolByUser.includes(rolSingle));
    if(!checkValueRol){
      handleHttpError(res, "USER_NOT_HAVE_PERMISSION", 403);
      return;
    }
    next();
  } catch (error) {
  handleHttpError(res, "ERROR_PERMISSION_DENIED", 403);
  }  
};

module.exports = checkRol;
