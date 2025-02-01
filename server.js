//==============================================================================================================
// Server Setup
// This file sets up the Express server, applies middleware, and defines API routes.
// It initializes the API endpoints and starts the server on a specified port.
//==============================================================================================================


require('dotenv').config();  // Lädt .env-Inhalt in process.env
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const itemsRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const app = express();
const log = require('./src/log');

//==============================================================================================================
// Changelog
//==============================================================================================================
//
// Version 0.2: February 1, 2025
// * Added middleware for logging
//
// Version 0.1: January 31, 2025
// * Initial implementation
//
//==============================================================================================================


//--------------------------------------------------------------------------------------------------------------
// Middleware Configuration
//--------------------------------------------------------------------------------------------------------------
app.use(express.json());
app.use(helmet());
app.use(cors());

app.set('trust proxy', true);

//--------------------------------------------------------------------------------------------------------------
// API Endpoints
//--------------------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('API läuft!');
});

app.use('/api/items', itemsRoutes);
app.use('/api/auth', authRoutes);

//--------------------------------------------------------------------------------------------------------------
// Start Server
//--------------------------------------------------------------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server runs on Port ${PORT}`);
  log.writeLog(`Server runs on Port ${PORT}`, 'server', 'app.listen');
});
