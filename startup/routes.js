const express = require('express');
const cors = require('cors');
const addGuestOrder = require('../routes/addGuestOrder');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use('/api/guest', addGuestOrder);
};
