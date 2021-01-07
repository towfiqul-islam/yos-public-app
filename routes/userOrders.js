const express = require('express');

const router = express.Router();
const connection = require('../startup/db');

function addOrderItem(fields) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO user_order_items SET ?`;

    connection.query(sql, fields, (err, results) => {
      if (err) {
        console.error('sql error', err);
      }
      resolve(results.insertId);
    });
  });
}

function addUserOrder(fields) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO user_orders SET ?`;
    connection.query(sql, fields, (err, results) => {
      if (err) {
        console.error('sql error', err);
      }
      resolve(results.insertId);
    });
  });
}

router.post('/add_order', async (req, res) => {
  // TODO: Handle http status later
  const insertID = await addUserOrder(req.body);
  res.json({insertID});
});

router.post('/add_order_item', async (req, res) => {
  const insertID = await addOrderItem(req.body);
  res.json(insertID);
});

module.exports = router;
