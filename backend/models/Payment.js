const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Invoice = require('./Invoice');

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  invoiceId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Invoice, key: 'id' }
  },
  paymentDate: { type: DataTypes.DATEONLY, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  method: { 
    type: DataTypes.ENUM('Gotovina','Kartica','Bankovni prijenos') 
  },
}, {
  tableName: 'uplate',
  timestamps: true,
  createdAt: 'kreirano',
  updatedAt: false,
});

module.exports = Payment;
