const express = require('express');
const router = express.Router();
const connection = require('../startup/db');

function getMedByTradeName(name) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM medicines WHERE trade_name LIKE '%${name}%'`;

    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

function getMedDetails(id) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM medicines WHERE medicine_id=${id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results[0]);
    });
  });
}

router.get('/details/:id', async (req, res) => {
  const data = await getMedDetails(req.params.id);
  res.json({data});
});

router.get('/search/:trade_name', async (req, res) => {
  const data = await getMedByTradeName(req.params.trade_name);
  res.json({data});
});

module.exports = router;
