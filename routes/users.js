const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {transport} = require('../mail');
const router = express.Router();

const connection = require('../startup/db');
const auth = require('../middleware/auth');

// - API routes - /api/users
// - /sign-up - POST
// - /sign-in - POST
// - /update-account/:id - PUT
// - /reset-password/:id - PUT
// - /get-user/:id - GET

function signUp(fields) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO users SET ?`;
    connection.query(sql, fields, (err, results) => {
      if (err) {
        reject(err.sqlMessage);
        // throw err;
      } else {
        resolve(results.insertId);
      }
    });
  });
}

function signIn(email) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM users WHERE email='${email}'`;
    connection.query(sql, (err, results) => {
      if (err) reject(err.sqlMessage);
      else {
        resolve(results[0]);
      }
    });
  });
}

function updateAccount(id, fields) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE users SET ? WHERE id=${id}`;
    connection.query(sql, fields, (err, results) => {
      if (err) reject(err);
      else {
        resolve(results.affectedRows);
      }
    });
  });
}

function getUser(id) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM users WHERE id=${id}`;
    connection.query(sql, (err, results) => {
      if (err) reject(err);
      else {
        resolve(results[0]);
      }
    });
  });
}

function resetPassword(id, password) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE users SET password='${password}' WHERE id=${id}`;
    connection.query(sql, (err, results) => {
      if (err) reject(err);
      else {
        resolve(results.affectedRows);
      }
    });
  });
}

function getUserIDByEmail(mail) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT id FROM users WHERE email='${mail}'`;
    connection.query(sql, (err, results) => {
      if (err) reject(err);
      else {
        resolve(results[0]);
      }
    });
  });
}

router.get('/get-user-id-by-mail/:mail', async (req, res) => {
  try {
    const userID = await getUserIDByEmail(req.params.mail);
    res.json(userID);
    if (userID === undefined) {
      res.json({msg: 'email does not exist'});
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({msg: 'Something went worng!!'});
  }
});

//TODO: Auth middleware
router.put('/reset-password/:id', async (req, res) => {
  try {
    const checkPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (checkPassword.test(req.body.password)) {
      const id = await resetPassword(req.params.id, req.body.password);
      res.json({id, msg: 'Password updated. You need to sign in'});
    } else
      res.json({
        msg:
          'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
      });
  } catch (err) {
    res.status(400).json({msg: 'Something went worng!!'});
  }
});

// TODO: Auth middleware
router.get('/get-user', auth, async (req, res) => {
  try {
    const user = await getUser(req.user.id);
    res.json({user});
  } catch (err) {
    res.status(400).json({msg: 'Something went worng!!'});
  }
});

// TODO: Auth middleware
router.put('/update-account/:id', async (req, res) => {
  try {
    const row = await updateAccount(req.params.id, req.body);
    res.json({
      row,
      msg: 'account updated',
    });
  } catch (err) {
    res.status(400).json({msg: 'Something went worng!!'});
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    const user = await signIn(req.body.email);

    let validPassword;
    if (user) {
      validPassword = await bcrypt.compare(req.body.password, user.password);
    }

    if ((user && user.email) === req.body.email && validPassword) {
      const token = jwt.sign({id: user.id}, process.env.JWT_KEY);

      res
        .header('x-auth-token', token)
        .json({user, msg: 'Sign in success', token});
    } else {
      res.json({
        msg: 'Invalid email or password',
      });
    }
  } catch (err) {
    // console.error(err);
    return res.status(400).json({msg: 'Something went worng!!'});
  }
});

router.post('/sign-up', async (req, res) => {
  try {
    const checkPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (checkPassword.test(req.body.password)) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const id = await signUp(req.body);
      res.json({id, msg: 'Sign up success'});
    } else
      res.json({
        msg:
          'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
      });
  } catch (err) {
    if (err === `Duplicate entry 'towfiqu@gmail.com' for key 'email'`) {
      res.json({msg: 'Email already in use'});
    } else {
      res.json({
        msg: 'Something went wrong! Please try again few minutes later',
      });
    }
  }
});

function verifyMail(id) {
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE users SET isVerified = 'yes' WHERE id=${id}`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
      resolve(results.affectedRows);
    });
  });
}

// Verify mail
router.put('/verify-email/:id', async (req, res) => {
  try {
    const row = await verifyMail(req.params.id);
    res.json({
      row,
      msg: 'email verified',
    });
  } catch (err) {
    res.status(400).json({msg: 'Something went worng!!'});
  }
});

// Verification mail
router.post('/send-verification-mail/:id', async (req, res) => {
  try {
    await transport.sendMail({
      from: 'yoscombd@yos.com.bd',
      to: req.body.user_email,
      subject: 'Verify Your Email',
      html: `
        <div>
          <p>Click the following link to verify your email</p>
          <a style="padding: 8px 12px; text-decoration: none; color: white; background: black; display: inline-block;" href=${
            process.env.NODE_ENV === 'testing'
              ? 'http://localhost:3000'
              : 'https://yos.com.bd'
          }/verify-email/${req.params.id}>Verify Email</a>
        </div>
      `,
    });

    res.json({msg: 'Verification link sent!'});
  } catch (err) {
    console.error('Something went wrong!', err);
    return res.status(400).send('Something went wrong!');
  }
});

// Reset password mail
router.post('/send-reset-password-mail/:id', async (req, res) => {
  try {
    await transport.sendMail({
      from: 'yoscombd@yos.com.bd',
      to: req.body.user_email,
      subject: 'Password reset',
      html: `
        <div>
          <p>Click the following link to reset your password</p>
          <a style="padding: 8px 12px; text-decoration: none; color: white; background: black; display: inline-block;" href=${
            process.env.NODE_ENV === 'testing'
              ? 'http://localhost:3000'
              : 'https://yos.com.bd'
          }/reset-password/${req.params.id}>Reset password</a>
        </div>
      `,
    });

    res.json({msg: 'Reset link sent!'});
  } catch (err) {
    console.error('Something went wrong!', err);
    return res.status(400).send('Something went wrong!');
  }
});

module.exports = router;
