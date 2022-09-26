const { sequelize } = require("../../../config/config");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");
const Character = require("./characters");
const Gender = require("./gender");

const Movie = sequelize.define(
  "Movies",
  {
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
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
 * implementar metodo propio con relacion Storage
 */
Movie.findByAllData = function () {
  Movie.belongsTo(Storage, {
    foreignKey: "mediaId",
  });

  Movie.belongsTo(Gender, {
    foreignKey: "Gender",
  });

  Movie.belongsToMany(Character, {
    through: "Character_Movie",
    foreignKey: "Movie",
  });

  return Movie.findAll({
    include: [
      {
        model: Storage,
        attributes: ["url", "fileName"],
      },
      {
        model: Gender,
        attributes: ["Name"],
      },
    ],
  });
};

/**
 * implementar metodo propio con relaion a storage
 */
Movie.findOneData = function (id) {
  Movie.belongsTo(Storage, {
    foreignKey: "mediaId",
  });
  Movie.belongsTo(Gender, {
    foreignKey: "Gender",
  });

  return Movie.findOne({
    where: { id },
    include: [
      {
        model: Storage,
        attributes: ["url", "fileName"],
      },
      {
        model: Gender,
        attributes: ["Name"],
      },
    ],
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
  let id = Number(idData);
  return Movie.destroy({
    where: { id },
  }).then(() => {
    return `Movie with id ${id} was deleted`;
  });
};

module.exports = Movie;
