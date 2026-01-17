const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error('DB connection error:', err));

const db = {};

// ⬇⬇⬇ OVO MORA BITI PRIJE sync()
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELI
db.Patient = require('./Patient')(sequelize, DataTypes);
db.User = require('./Users')(sequelize, DataTypes);
db.Payment = require('./Payment')(sequelize, DataTypes);
db.ActivityHistory = require('./ActivityHistory')(sequelize, DataTypes);
db.Document = require('./Document')(sequelize, DataTypes);
db.Delivery = require('./Delivery')(sequelize, DataTypes);
db.Invoice = require('./Invoice')(sequelize, DataTypes);
db.AuditLog = require('./AuditLog')(sequelize, DataTypes);
// dodavaj ostale modele ovdje

// ASSOCIATE
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


// ⬇⬇⬇ sync IDE TEK NAKON što db.sequelize postoji
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Tables synced');
  })
  .catch(err => {
    console.error('Sync error:', err);
  });

module.exports = db;
