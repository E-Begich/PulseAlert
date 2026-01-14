const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bolnica_opomene', 'root', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // true ako želiš vidjeti SQL upite
});

module.exports = sequelize;
