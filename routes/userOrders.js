const express = require('express');
const {transport} = require('../mail');

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

// user order mail

router.post('/user_order_mail', async (req, res) => {
  try {
    await transport.sendMail({
      from: 'yoscombd@yos.com.bd',
      to: 'yos_health@yos.com.bd',
      subject: 'User order',
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
               ${
                 req.body.orderedItems !== undefined
                   ? ` 
                <div>
                <h4>Ordered items</h4>
                ${req.body.orderedItems
                  .map(
                    (item, index) => `<div>
                  <p style="margin: 0; ">${index + 1}. Item name: ${
                      item.item_name
                    } ${item.medicine_type}</p>
                  <p style="margin: 0; ">Quantity: ${item.quantity}</p>
                  <p style="margin-bottom: 10px; ">Price: ${
                    Math.round((item.price + Number.EPSILON) * 100) / 100
                  }</p>
                  </div>`,
                  )
                  .join('')}
                  <h4 style="margin-top: 10px">Total amount: ${
                    Math.round((req.body.total_amount + Number.EPSILON) * 100) /
                    100
                  }</h4>
                  <h3 style="margin-top: 10px">
                    Amount after ${req.body.discount_percentage}% discount: ${
                       Math.round(
                         (req.body.amount_after_discount + Number.EPSILON) *
                           100,
                       ) / 100
                     }
                  </h3>
                    </div>`
                   : `<div>No item was ordered. Should be added from admin panel later.</div>`
               }
                    
                    <div>
                  <a style="margin-top: 10px; display: inline-block; background: black; padding: 8px 12px; color: white; border-radius: 4px; text-align: center; text-decoration: none;" href='${
                    process.env.NODE_ENV === 'testing'
                      ? 'http://localhost:3001'
                      : 'https://admin.yos.com.bd'
                  }/update-order/${req.body.order_id}'>Update order</a>
                  </div>
                `,
    });
    res.send('Message sent');
  } catch (err) {
    console.error('Something went wrong', err);
    return res.status(400).send('Something went wrong!');
  }
});

router.post('/send_order_mail_to_user', async (req, res) => {
  try {
    await transport.sendMail({
      from: 'yoscombd@yos.com.bd',
      to: req.body.customer_email,
      subject: 'Your order',
      html: ` 
                <div>
                <h2>Here is your order details</h2>
                <p>Name: ${req.body.customer_name}</p>
                <p>Phone: ${req.body.customer_phone}</p>
                <p>Address: ${req.body.customer_address}</p>
                <p>Additional Notes: ${
                  req.body.customer_additional_notes === ''
                    ? 'n/a'
                    : req.body.customer_additional_notes
                } </p>
                <p>Prescription:${
                  req.body.customer_prescription === ''
                    ? ' To be uploaded'
                    : `<a href=${req.body.customer_prescription} target='_blank'> Click to see</a>`
                }</p>
                </div>
                <br >
               ${
                 req.body.orderedItems !== undefined
                   ? ` 
                <div>
                <h4>Ordered items</h4>
                <table style="border-collapse: collapse;
                    width: 300px;">
                    <thead>
                    <tr>
                      <th style="border: 1px solid #ddd; padding: 8px; width: 60%">Item name</th>
                      <th style="border: 1px solid #ddd; padding: 8px; width: 15%">Qty</th>
                      <th style="border: 1px solid #ddd; padding: 8px; width: 20%">Price</th>
                    </tr>
                    </thead>
                ${req.body.orderedItems
                  .map(
                    (item, index) => `
                    
                    <tbody>
                    <tr>
                      <td style="border: 1px solid #ddd; text-align: center; padding: 8px; width: 60%">${
                        item.item_name
                      } ${item.medicine_type}</td>
                      <td style="border: 1px solid #ddd; text-align: center; padding: 8px; width: 15%">${
                        item.quantity
                      }</td>
                      <td style="border: 1px solid #ddd; text-align: center; padding: 8px; width: 20%">${
                        Math.round((item.price + Number.EPSILON) * 100) / 100
                      }</td>
                    </tr>
                    </tbody>
                    </table>
                  `,
                  )
                  .join('')}
                  <h3 style="margin-top: 20px">Total amount: ${
                    Math.round((req.body.total_amount + Number.EPSILON) * 100) /
                    100
                  }</h3>
                  <h3 style="margin-top: 10px">
                    Amount after ${req.body.discount_percentage}% discount: ${
                       Math.round(
                         (req.body.amount_after_discount + Number.EPSILON) *
                           100,
                       ) / 100
                     }
                  </h3>
                    </div>`
                   : `<div>We will add your items after confirming with you</div>`
               }
                    
                    <div>
                 <P style="text-align: center; font-size: 20px;">Thanks for doing business with us!</p>
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
