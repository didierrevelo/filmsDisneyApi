const { sequelize } = require('../../../config/db');
const { DataTypes } = require('sequelize');
const Storage = require('./storage');


const Character = sequelize.define(
  'characters',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    History: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Movie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mediaId: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: true,
  }
);

/**
 * implementar metodo propio con relaion Storage
 */
Character.findByAllData = function () {
  Character.belongsTo(Storage, {
    foreignKey: 'mediaId',
  });
  return Character.findAll({ include: Storage });
};

/**
 * implementar metodo propio con relaion a storage
 */
Character.findOneData = function (id) {
  Character.belongsTo(Storage, {
    foreignKey: 'mediaId',
  });
  return Character.findOne({
    where: { id },
    include: Storage
  });
};


/**
 * implementar metodo propio para actualizar un registro
 */
Character.updateData = async function (id, data) {
  await Character.update(data, {
    where: { id },
  });
  return await Character.findOne({
    where: { id },
  });
};

/**
 * implementar metodo propio para eliminar un registro
 */
Character.deleteData = function (idData) {
  let id = Number(idData._id)
  return Character.destroy({
    where: { id },
  }).then(() => {
    return `Character with id ${id} was deleted`;
   });
}


module.exports = Character;
