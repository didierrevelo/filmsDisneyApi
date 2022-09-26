const { sequelize } = require("../../../config/config");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");

const Gender = sequelize.define(
  "gender",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Movie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mediaId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * implementar metodo propio con relaion Storage
 */
Gender.findByAllData = function () {
  Gender.belongsTo(Storage, {
    foreignKey: "mediaId",
  });
  return Gender.findAll({ include: Storage });
};

/**
 * implementar metodo propio con relaion a storage
 */
Gender.findOneData = function (id) {
  Gender.belongsTo(Storage, {
    foreignKey: "mediaId",
  });
  return Gender.findOne({
    where: { id },
    include: Storage,
  });
};

/**
 * implementar metodo propio para actualizar un registro
 */
Gender.updateData = async function (id, data) {
  await Gender.update(data, {
    where: { id },
  });
  return await Gender.findOne({
    where: { id },
  });
};

/**
 * implementar metodo propio para eliminar un registro
 */
Gender.deleteData = function (idData) {
  let id = Number(idData);
  return Gender.destroy({
    where: { id },
  }).then(() => {
    return `Gender with id ${id} was deleted`;
  });
};

module.exports = Gender;
