const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING(50), allowNull: false },
  lastName: { type: DataTypes.STRING(50), allowNull: false },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(256), allowNull: false },
  role: { type: DataTypes.ENUM('admin','staff'), allowNull: false },
}, {
  tableName: 'korisnici',
  timestamps: true,
  createdAt: 'kreirano',
  updatedAt: false,
});

module.exports = User;


