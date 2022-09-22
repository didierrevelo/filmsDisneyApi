const { sequelize } = require('../../../config/db');
const { DataTypes } = require('sequelize');
const Storage = require('./storage');


const Movie = sequelize.define(
  'Movies',
  {
    Title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    associated_characters: {
      type: DataTypes.JSON,
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
 * implementar metodo propio con relacion Storage
 */
Movie.findByAllData = function () {
  Movie.belongsTo(Storage, {
    foreignKey: 'mediaId',
  });
  return Movie.findAll({ include: Storage });
};

/**
 * implementar metodo propio con relaion a storage
 */
Movie.findOneData = function (id) {
  Movie.belongsTo(Storage, {
    foreignKey: 'mediaId',
  });
  return Movie.findOne({
    where: { id },
    include: Storage
  });
};

/**
 * implementar metodo propio para actualizar un registro
 */
Movie.updateData = async function (id, data) {
  await Movie.update(data, {
    where: { id },
  });
  return await Movie.findOne({
    where: { id },
  });
};

/**
 * implementar metodo propio para eliminar un registro
 */
Movie.deleteData = function (idData) {
  let id = Number(idData._id)
  return Movie.destroy({
    where: { id },
  }).then(() => {
    return `Movie with id ${id} was deleted`;
  });
}

module.exports = Movie;
