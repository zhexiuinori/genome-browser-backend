// config/express.js

const express = require('express');
const path = require('path');
require('dotenv').config();

module.exports = () => {
  const app = express();

  // Serve static files
  app.use(express.static(path.join(__dirname, '../public')));

  return app;
};