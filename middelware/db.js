//==============================================================================================================
// Database Connection
// This file sets up the connection to the PostgreSQL database using environment variables.
//==============================================================================================================

require('dotenv').config();


//==============================================================================================================
//  Module Exports
//==============================================================================================================
//
//  pool: Pool
//  * Database connection pool
//  schema: string
//  * Database schema
//
//==============================================================================================================
//  Changelog
//==============================================================================================================
//
//  Version 0.1: January 31, 2025
//  * Initial implementation
//
//==============================================================================================================
// End of Helpfile
//==============================================================================================================

const { Pool } = require('pg');
const log = require('../src/log');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

const schema = process.env.DB_SCHEMA;

const dbData = {
    pool: pool,
    schema: schema,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

log.writeLog('Database connection established', 'db', 'initialize');

module.exports = dbData;

//==============================================================================================================
// End of File
//==============================================================================================================