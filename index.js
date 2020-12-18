const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');

require('dotenv').config({path: 'variables.env'});

const connection = require('./startup/db');
require('./startup/routes')(app);

connection.connect();

app.use(compression());
app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
