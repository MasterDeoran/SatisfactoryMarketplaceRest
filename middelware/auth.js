//==============================================================================================================
// Auth Middleware
// This file contains the middleware for handling authentication.
// The middleware checks if the request has a valid JWT token.
//==============================================================================================================

const jwt = require('jsonwebtoken');
const log = require('../src/log');

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

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token available' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token invalid or expired' });
  }
};

log.writeLog('Auth middleware loaded', 'auth', 'initialize');

//==============================================================================================================
// End of File
//==============================================================================================================