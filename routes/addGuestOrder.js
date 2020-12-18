const express = require('express');
const {transport} = require('../mail');
const router = express.Router();

const connection = require('../startup/db');

function addOrderItem(fields) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO guest_order_items SET ?`;

    connection.query(sql, fields, (err, results) => {
      if (err) {
        console.error('sql error', err);
      }
      resolve(results.insertId);
    });
    // pool.getConnection(function (err, connection) {
    // connection.query(sql, fields, (err, results) => {
    //   if (!err) {
    //     connection.release();
    //     resolve(results.insertId);
    //   } else {
    //     console.error('OOPS!!!', err);
    //   }
    // });
    // });
  });
}

function addGuestOrder(fields) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO guest_orders SET ?`;
    connection.query(sql, fields, (err, results) => {
      if (err) {
        console.error('sql error', err);
      }
      resolve(results.insertId);
    });
    // pool.getConnection(function (err, connection) {
    //   connection.query(sql, fields, (err, results) => {
    //     if (!err) {
    //       connection.release();
    //       resolve(results.insertId);
    //     } else {
    //       throw err;
    //     }
    //   });
    // });
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

router.post('/mail_test', async (req, res) => {
  try {
    await transport.sendMail({
      from: 'yoscombd@yos.com.bd',
      to: 'guest_order@yos.com.bd',
      subject: 'Guest order',
      html: ` 
                <div>
                <h2>Customer info</h2>
                <p>Name: ${req.body.customer_name}</p>
                <p>Phone: ${req.body.customer_phone}</p>
                <p>Address: ${req.body.customer_address}</p>
                <p>Additional Notes: ${req.body.customer_additional_notes}</p>
                <p>Prescription:${
                  req.body.customer_prescription === ''
                    ? ' To be uploaded'
                    : `<a href=${req.body.customer_prescription} target='_blank'> Click to see</a>`
                }</p>
                </div>
                <br >
                <div>
                ${req.body.orderedItems && `<h4>Ordered items</h4>`}
                ${
                  req.body.orderedItems &&
                  req.body.orderedItems
                    .map(
                      (item, index) => `<div>
                  <p style="margin: 0; ">${index + 1}. Item name: ${
                        item.item_name
                      }</p>
                  <p style="margin: 0; ">Quantity: ${item.quantity}</p>
                  <p style="margin-bottom: 10px; ">Price: ${item.price}</p>
                  </div>`,
                    )
                    .join('')
                }
                  <h4 style="margin-top: 10px">Total amount: ${
                    // req.body.total_amount
                    Math.round((req.body.total_amount + Number.EPSILON) * 100) /
                    100
                  }</h4>
                  <h3 style="margin-top: 10px">
                    Amount after ${req.body.discount_percentage}% discount: ${
        // req.body.amount_after_discount
        Math.round((req.body.amount_after_discount + Number.EPSILON) * 100) /
        100
      }
                  </h3>

                  <a href='https://admin-stage.yos.com.bd/update-order/${
                    req.body.order_id
                  }'>Update order</a>
                  </div>
                `,
    });
    res.send('Message sent');
  } catch (err) {
    console.error('Something went wrong', err);
    return res.status(400).send('Something went wrong!');
  }
});

module.exports = router;
