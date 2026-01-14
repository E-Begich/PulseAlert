const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Patient = sequelize.define('Patient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING(50), allowNull: false },
  lastName: { type: DataTypes.STRING(50), allowNull: false },
  oib: { type: DataTypes.STRING(11), allowNull: false, unique: true },
  address: { type: DataTypes.STRING(100) },
  city: { type: DataTypes.STRING(50) },
  postalCode: { type: DataTypes.STRING(10) },
}, {
  tableName: 'pacijenti',
  timestamps: true,
  createdAt: 'kreirano',
  updatedAt: false,
});

module.exports = Patient;
