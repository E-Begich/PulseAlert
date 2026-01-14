const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Patient = require('./Patient');
const User = require('./User');

const Invoice = sequelize.define('Invoice', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: Patient, key: 'id' }
  },
  invoiceNumber: { type: DataTypes.STRING(50), allowNull: false },
  amountDue: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  issueDate: { type: DataTypes.DATEONLY, allowNull: false },
  dueDate: { type: DataTypes.DATEONLY, allowNull: false },
  paymentStatus: { 
    type: DataTypes.ENUM('Na cekanju','Placeno','Kasni'), 
    defaultValue: 'Na cekanju'
  },
  reminderSent: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdBy: { 
    type: DataTypes.INTEGER, 
    references: { model: User, key: 'id' }
  },
}, {
  tableName: 'racuni',
  timestamps: true,
  createdAt: 'kreirano',
  updatedAt: false,
});

module.exports = Invoice;
