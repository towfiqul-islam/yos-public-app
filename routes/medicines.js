const express = require('express');
const router = express.Router();
const connection = require('../startup/db');

function getMedByTradeName(name) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM medicines WHERE trade_name LIKE '%${name}%'`;
    // pool.getConnection(function (err, connection) {
    //   connection.query(sql, (err, results) => {
    //     if (!err) {
    //       connection.release();
    //       resolve(results);
    //     } else {
    //       console.error('OOPS!!!', err);
    //     }
    //   });
    // });
    connection.query(sql, (err, results) => {
      resolve(results);
    });
  });
}

router.get('/search/:trade_name', async (req, res) => {
  // const trade_name = new RegExp(`.*${req.params.trade_name}.*`, 'i');
  const data = await getMedByTradeName(req.params.trade_name);
  res.json({data});
});

module.exports = router;
