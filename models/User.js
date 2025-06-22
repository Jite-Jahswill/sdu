const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  matricNumber: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
},
state: {
  type: DataTypes.STRING,
  allowNull: true,
},
country: {
  type: DataTypes.STRING,
  allowNull: true,
},
profilePicture: {
  type: DataTypes.STRING,
  allowNull: true, // store image URL
},
  resetToken: {
  type: DataTypes.STRING,
  allowNull: true,
},
resetTokenExpiry: {
  type: DataTypes.DATE,
  allowNull: true,
},

});

module.exports = User;
