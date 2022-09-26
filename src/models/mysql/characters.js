const { sequelize } = require("../../../config/config");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");

const Character = sequelize.define(
  "characters",
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
    Age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    History: {
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
Character.findByAllData = function () {
  Character.belongsTo(Storage, {
    foreignKey: "mediaId",
  });
  return Character.findAll({
    include: [
      {
        model: Storage,
        attributes: ["url", "fileName"],
      },
    ],
  });
};

/* A method that is going to find
 * one character by id and it is going to include
 * the storage model.
 */
Character.findOneData = function (id) {
  Character.belongsTo(Storage, {
    foreignKey: "mediaId",
  });
  return Character.findOne({
    where: { id },
    include: [
      {
        model: Storage,
        attributes: ["url", "fileName"],
      },
    ],
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


/* This is a method that is going to delete
 * a character by id. */
Character.deleteData = function (idData) {
  console.log(idData);
  if (typeof(idData) !== "number") {
    let id = Number(idData);
    return Character.destroy({
      where: { id },
    }).then(() => {
      return `Character with id ${id} was deleted`;
    });
  } else {
    return Character.destroy({
      where: { id: idData.id },
    }).then(() => {
      return `Character with id ${idData} was deleted`;
    });
  }
};

module.exports = Character;
