//==============================================================================================================
// Item Routes
// This file contains the routes for handling item-related requests.
// The GET /api/items/:id route is used to retrieve the value of an item from the database.
//==============================================================================================================

// routes/items.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middelware/auth');
const dbData = require('../middelware/db');
const log = require('../src/log');

//==============================================================================================================
//  route commands
//==============================================================================================================
//
//  GET /api/items/:id
//  Retrieve the value of an item from the database
//
//==============================================================================================================
//  Changelog
//==============================================================================================================
//
//   Version 0.2: February 1, 2025
//   *  Adding the logging of status messages
//
//  Version 0.1: January 31, 2025
//  *   Initial implementation
//
//==============================================================================================================
//  End of Helpfile
//==============================================================================================================

router.get('/:id', authMiddleware, async (req, res) => {
  const itemId = req.params.id;

  // Get the caller's IP address (Express sets req.ip)
  const callerIP = req.ip;

  try {
    const query = 'SELECT "VALUE" FROM "' + dbData.schema + '".item_market_v WHERE "ITEM_ID" = $1';
    const { rows } = await dbData.pool.query(query, [itemId]);

    if (rows.length === 0) {
        log.writeLog('No entry found', 'items', 'GET /:id', 'warn', callerIP);
        return res.status(404).json({ message: 'No entry found' });
    }

    const value = rows[0].VALUE;
    console.log(rows);

    return res.json({ itemValue: value });
  } catch (error) {
    console.error('Error when retrieving item data:', error);
    log.writeLog('Error when retrieving item data: ' + error, 'items', 'GET /:id', 'error', callerIP);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

log.writeLog('Items routes loaded', 'items', 'initialize');

module.exports = router;

//==============================================================================================================
// End of File
//==============================================================================================================