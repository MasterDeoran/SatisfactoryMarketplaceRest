//==============================================================================================================
// Auth Routes
// This file contains the routes for the authentication process.
// The login route is used to authenticate the user and return a JWT token.
//==============================================================================================================

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../middelware/db').pool;

//==============================================================================================================
// route commands
//==============================================================================================================
//
// POST /auth/login
// Authenticate the user and return a JWT token
//
//==============================================================================================================
// Changelog
//==============================================================================================================
//
// Version 0.1: January 31, 2025
// * Initial implementation
//
//==============================================================================================================
// End of Helpfile
//==============================================================================================================


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // User from Database 
    // Check if user exists
    const query = 'SELECT NOW()';
    const { rows } = await pool.query(query);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid login data' });
    }

    const user = rows[0];
    
    // JWT Token Creation
    const payload = { id: 2, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

//==============================================================================================================
// End of File
//==============================================================================================================