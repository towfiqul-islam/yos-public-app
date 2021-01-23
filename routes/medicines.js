const express = require('express');
const router = express.Router();
const connection = require('../startup/db');

function getMedByTradeName(name) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM medicines WHERE trade_name LIKE '%${name}%' LIMIT 10`;

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

function browseMeds(page) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM medicines LIMIT 10 OFFSET ${(page - 1) * 10}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

function getRandomMeds() {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM medicines ORDER BY RAND() LIMIT 10`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

function getTotalCount() {
  return new Promise(function (resolve, reject) {
    const sql = 'SELECT COUNT(*) AS total_count FROM medicines';
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results[0]);
    });
  });
}

function getTotalCountByLetter(letter) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT COUNT(*) AS total_count FROM medicines WHERE trade_name LIKE '${letter}%'`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results[0]);
    });
  });
}

function browseMedsByLetter(letter, page) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM medicines WHERE trade_name LIKE '${letter}%' LIMIT 10 OFFSET ${
      (page - 1) * 10
    }`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results);
    });
  });
}

router.get('/get-random-meds', async (req, res) => {
  const data = await getRandomMeds();
  res.send(data);
});

router.get('/browse_medicines_by_letter/:letter/:page', async (req, res) => {
  const data = await browseMedsByLetter(req.params.letter, req.params.page);
  res.send(data);
});

router.get('/total_count_by_letter/:letter', async (req, res) => {
  const count = await getTotalCountByLetter(req.params.letter);
  res.send(count);
});

router.get('/total_count', async (req, res) => {
  const count = await getTotalCount();
  res.send(count);
});

router.get('/browse_medicines/:page', async (req, res) => {
  const data = await browseMeds(req.params.page);
  res.send(data);
});

router.get('/details/:id', async (req, res) => {
  const data = await getMedDetails(req.params.id);
  res.json({data});
});

router.get('/search/:trade_name', async (req, res) => {
  const data = await getMedByTradeName(req.params.trade_name);
  res.json({data});
});

module.exports = router;
