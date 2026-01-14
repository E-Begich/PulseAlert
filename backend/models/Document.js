const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Invoice = require('./Invoice');

const Document = sequelize.define('Document', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  invoiceId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Invoice, key: 'id' }
  },
  filePath: { type: DataTypes.STRING(255), allowNull: false },
  fileType: { type: DataTypes.STRING(20) },
  uploadTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'dokumenti',
  timestamps: false
});

module.exports = Document;
