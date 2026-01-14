const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Invoice = require('./Invoice');

const ActivityHistory = sequelize.define('ActivityHistory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  invoiceId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Invoice, key: 'id' }
  },
  sendDate: { type: DataTypes.DATE, allowNull: false },
  method: { type: DataTypes.ENUM('Mail','SMS','Posta'), allowNull: false },
  action: { type: DataTypes.STRING(100) }
}, {
  tableName: 'povijest_aktivnosti',
  timestamps: true,
  createdAt: 'kreirano',
  updatedAt: false,
});

module.exports = ActivityHistory;
