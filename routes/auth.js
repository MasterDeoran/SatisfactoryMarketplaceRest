//==============================================================================================================
// Auth Routes
// This file contains the routes for the authentication process.
// The login route is used to authenticate the user and return a JWT token.
//==============================================================================================================

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../middelware/db').pool;
const user = require('../middelware/db').user;
const pwd = require('../middelware/db').password;
const log = require('../src/log');

//==============================================================================================================
// route commands
//==============================================================================================================
//
// POST /auth/login
// Authenticate the user and return a JWT token
//
//==============================================================================================================
// Module Exports
//==============================================================================================================
//
// router: Express Router
// * /login: POST
// 
//==============================================================================================================
// Changelog
//==============================================================================================================
//
//  Version 0.2: February 1, 2025
//   *  Adding the logging of status messages
//
//  Version 0.1: January 31, 2025
//  *   Initial implementation
//
//==============================================================================================================
// End of Helpfile
//==============================================================================================================


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Get the caller's IP address (Express sets req.ip)
    const callerIP = req.ip || '';

    log.writeLog('Login attempt', 'auth', 'login','info', callerIP);

    if (!username || !password) {
        log.writeLog('No username or password provided', 'auth', 'login', 'warn', callerIP);
        return res.status(400).json({ message: 'No username or password provided' });
    }
    if (username !== user || password !== pwd) {
        log.writeLog('Invalid login data with ' + username + ':' + password, 'auth', 'login', 'warn', callerIP);
        return res.status(401).json({ message: 'Invalid login data' });
    }
    try {
        // User from Database 
        // Check if user exists
        const query = 'SELECT NOW()';
        const { rows } = await pool.query(query);

        if (rows.length === 0) {
            log.writeLog('No user found', 'auth', 'login','info', callerIP);
            return res.status(401).json({ message: 'Invalid login data' });
        }

        const user = rows[0];
        
        // JWT Token Creation
        const payload = { id: 2, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        log.writeLog('Login successful', 'auth', 'login','info', callerIP);
        return res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        log.writeLog('Login error', 'auth', 'login', 'error', callerIP);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

log.writeLog('Auth routes loaded', 'auth', 'initialize');

module.exports = router;

//==============================================================================================================
// End of File
//==============================================================================================================