// app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const router = require('./routes/routes');

app.use('/api', router);



// Test ruta
app.get('/', (req, res) => {
  res.send('Backend is running!');
});


// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const db = require('./models');

db.sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB error:', err));


