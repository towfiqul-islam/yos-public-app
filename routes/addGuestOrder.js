const express = require('express');
const router = express.Router();

const pool = require('../startup/db');

function addOrderItem(fields) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO guest_order_items SET ?`;

    pool.getConnection(function (err, connection) {
      connection.query(sql, fields, (err, results) => {
        if (!err) {
          connection.release();
          resolve(results.insertId);
        } else {
          console.error('OOPS!!!', err);
        }
      });
    });
  });
}

function addGuestOrder(fields) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO guest_orders SET ?`;
    pool.getConnection(function (err, connection) {
      connection.query(sql, fields, (err, results) => {
        if (!err) {
          connection.release();
          resolve(results.insertId);
        } else {
          throw err;
        }
      });
    });
  });
}

router.post('/add_order', async (req, res) => {
  // TODO: Handle http status later
  const insertID = await addGuestOrder(req.body);
  res.json({insertID});
});

router.post('/add_order_item', async (req, res) => {
  const insertID = await addOrderItem(req.body);
  res.json(insertID);
});

module.exports = router;
