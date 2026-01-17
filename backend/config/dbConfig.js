module.exports = {
  HOST: 'localhost',
  USER: 'root',     //
  PASSWORD: '',   // ako root nema lozinku, ide ''
  DB: 'pulsealert',            // ime baze 
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
