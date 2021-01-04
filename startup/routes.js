const express = require('express');
const cors = require('cors');
const addGuestOrder = require('../routes/addGuestOrder');
const medicines = require('../routes/medicines');
const users = require('../routes/users');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use('/api/guest', addGuestOrder);
  app.use('/api/medicines', medicines);
  app.use('/api/users', users);
};
