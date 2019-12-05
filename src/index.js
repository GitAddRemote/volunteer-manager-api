/**
 * Main Application File
 */

// Setup environment vars
require('dotenv').config();

// Module Imports
const path = require('path');
const express = require("express");
const serveStatic = require('serve-static');
const logger = require('./lib/logger');
const compress = require('./lib/compression');

// Imported Routes Modules
const volunteerRouter = require("./routes/volunteer-routes");

// Server and Application Setup
const app = express();
const port = 8080;

// Setup Utility
app.use(logger);
app.use(compress());

// Setup static file directory, here just being used for codesandbox display purposes
app.use(serveStatic(path.join(__dirname, './public')));

// Register Routes
app.use('/volunteer', volunteerRouter);

// Start server
app.listen(port, () =>
  console.log(
    `Tronic Volunteer Manager Server Running On Port: ${port}!`
  )
);
