const bcryptjs = require('bcryptjs');


const encrypt = async(password) => {
  const hash = await bcryptjs.hash(password, 10);
  return hash;
};

const decrypt = async(password, hash) => {
  const match = await bcryptjs.compare(password, hash);
  return match;
};

module.exports = {
  encrypt,
  decrypt,
};
