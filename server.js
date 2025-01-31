require('dotenv').config();  // Lädt .env-Inhalt in process.env
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const itemsRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Standard-Endpoint zum Test
app.get('/', (req, res) => {
  res.send('API läuft!');
});

// Routen für Items
app.use('/api/items', itemsRoutes);
app.use('/api/auth', authRoutes);

// Serverstart
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
