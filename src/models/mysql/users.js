const { sequelize } = require('../../../config/config');
const { DataTypes } = require('sequelize');


const User = sequelize.define(
  'users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM(
      ["user", "admin"]
    ),
    defaultValue: "user",
  },
},
  {
    timestamps: true
  }
);

module.exports = User;
