//==============================================================================================================
// Logging Module
// This file implements a logging mechanism that writes log entries to daily log files.
// Log entries include a timestamp, log type, base class, function name, and a message.
// The log folder is located in the parent directory of the 'src' folder.
//==============================================================================================================

const fs = require('fs');
const path = require('path');

//==============================================================================================================
//  Module Exports
//==============================================================================================================
//
//  writeLog: function(text: string, baseClass: string, functionName: string, logType: string = 'INFO'): void
//  *   Writes a log entry to the current day's log file.
//  *   logTypes: 'INFO', 'WARN', 'ERROR'
//
//==============================================================================================================
//  Changelog
//==============================================================================================================
//
//  Version 0.1: February 1, 2025
//   *  Initial implementation
//
//==============================================================================================================
//  End of Helpfile
//==============================================================================================================

// Path to the log folder (located in the parent directory of the current 'src' folder)
const logFolder = path.join(__dirname, '..', 'log');

// Create the folder if it does not exist
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder, { recursive: true });
}

// Maximum length for the fields baseClass and functionName
const MAX_FIELD_LENGTH = 12;
// Maximum length for the log type (e.g., "INFO", "WARN", "ERROR")
const MAX_TYPE_LENGTH  = 5;
// Maximum length for the IP address field (supports IPv6 addresses)
const MAX_IP_LENGTH    = 39;

/**
 * Formats a string to a specified maximum length:
 * - If the string is too long, it is truncated.
 * - If it is too short, it is padded with spaces.
 *
 * @param {string} str - The string to be formatted.
 * @param {number} maxLength - The desired maximum length.
 * @returns {string} - The formatted string.
 */
function formatField(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength);
  } else {
    return str.padEnd(maxLength, ' ');
  }
}

/**
 * Writes a log entry to the current day's log file.
 *
 * @param {string} text - The log message.
 * @param {string} baseClass - The name of the underlying class.
 * @param {string} functionName - The name of the executed function.
 * @param {string} logType - The type of the log entry (e.g., "info", "warn", "error"). Defaults to "INFO".
 * @param {string} ip - (Optional) The IP address of the caller.
 */
function writeLog(text, baseClass, functionName, logType = 'INFO', ip = '') {
  const now = new Date();
  
  // Create the filename in the format YYYY-MM-DD.log
  const dateString = now.toISOString().slice(0, 10); // e.g., "2025-02-01"
  const logFilePath = path.join(logFolder, `${dateString}.log`);
  
  // Create the timestamp in ISO format
  const timestamp = now.toISOString(); // e.g., "2025-02-01T12:34:56.789Z"
  
  const formattedBaseClass = formatField(baseClass, MAX_FIELD_LENGTH);
  const formattedFunctionName = formatField(functionName, MAX_FIELD_LENGTH);
  const formattedType = formatField(logType.toUpperCase(), MAX_TYPE_LENGTH);
  const formattedIP           = ip==''?'':formatField(ip, MAX_IP_LENGTH);

  // Create the log entry: [timestamp] logType: [baseClass] | [functionName]  <TAB> message
  const logEntry = `[${timestamp}] ${formattedType}: [${formattedBaseClass}] | [${formattedFunctionName}] ${formattedIP}\t${text}\n`;
  
  // Append the entry to the log file (the file is created if it does not exist)
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Fehler beim Schreiben ins Logfile:', err);
    }
  });
}

// Start call of the logger function
writeLog('module log is ready', 'log', 'initialize');

// Export the writeLog function for external usage
exports.writeLog = writeLog;

//==============================================================================================================
// End of File
//==============================================================================================================