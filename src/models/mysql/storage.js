const { sequelize } = require("../../../config/config");
const { DataTypes } = require("sequelize");

const storage = sequelize.define(
  "Storage",
  {
    url: {
      type: DataTypes.STRING,
    },
    filename: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * implementar metodo propio con relaion Storage
 */
storage.findByAllData = function () {
  return storage.findAll({});
};

/**
 * implementar metodo propio con relaion a storage
 */
storage.findOneData = function (id) {
  return storage.findOne({
    where: { id },
  });
};

/**
 * implementar metodo propio para eliminar un registro
 */
storage.deleteData = function (idData) {
  let id = Number(idData._id);
  return storage
    .destroy({
      where: { id },
    })
    .then(() => {
      return `file with id ${id} was deleted`;
    });
};

module.exports = storage;
