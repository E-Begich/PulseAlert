const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Invoice = require('./Invoice');

const Delivery = sequelize.define('Delivery', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  invoiceId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Invoice, key: 'id' }
  },
  status: { 
    type: DataTypes.ENUM('Poslana','U tranzitu','Dostavljena','Vraca')
  },
  lastAction: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'dostava',
  timestamps: false
});

module.exports = Delivery;
