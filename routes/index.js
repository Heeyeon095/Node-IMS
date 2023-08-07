var express = require('express');
var router = express.Router();
const DBCon = require('../components/dataSource');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'IMS' });
});

router.get('/main', function (req, res, next) {
  res.render('main', { title: 'IMS : main' });
});

router.get('/history', function (req, res, next) {
  res.render('history', { title: 'IMS : history' });
});

// post
router.post('/join', async function (req, res, next) {
  const loginId = req.body.join_id;
  const loginPs = req.body.join_ps;
  const sql = `
    insert into ims_member(login_id, member_name, member_password, reg_date)
    values(?, 'member_name', password(?), now())  
  `;
  const params = [loginId, loginPs];

  await DBCon.MAIN.query(sql, params);
  res.redirect('/');

  // console.log('id', loginId);
  // console.log('ps', loginPs);
  // res.render('history', { title: 'IMS : history' });
});

router.post('/loginProcess', async function (req, res, next) {
  const loginId = req.body.login_id;
  const loginPs = req.body.login_ps;
  const sql = `select * from ims_member where login_id = ? and member_password = password(?)  `;
  const params = [loginId, loginPs];

  const result = await DBCon.MAIN.query(sql, params);
  const members = result[0];

  if (Array.isArray(members) && members.length > 0) {
    res.send('T');
  } else {
    res.end('F');
  }

  // console.log('id', loginId);
  // console.log('ps', loginPs);
  // res.render('history', { title: 'IMS : history' });
});

module.exports = router;
