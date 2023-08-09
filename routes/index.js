var express = require('express');
var router = express.Router();
const DBCon = require('../components/dataSource');
const sqlHistory = `
SELECT 
  a.history_id
  , a.deal_period
  , if(a.state = '1', '입고', '출고') state
  , a.count
  , DATE_FORMAT(a.reg_date, '%Y-%m-%d %h:%i') reg_date 
  , DATE_FORMAT(a.upd_date, '%Y-%m-%d %h:%i') upd_date 
  , a.goods_code
  , b.goods_name 
  , a.login_id
FROM ims_history a
  inner join ims_goods b on (a.goods_code = b.goods_code)
order by a.upd_date desc, a.history_id desc
`;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'IMS' });
});

router.get('/main', function (req, res, next) {
  const session = req.session;
  const user = session['IMS_USER'];

  if (!user) {
    res.redirect('/');
  } else {
    res.render('main', { title: 'IMS : main', user });
  }
});

router.get('/history', async function (req, res, next) {
  const session = req.session;
  const user = session['IMS_USER'];

  if (!user) {
    res.redirect('/');
  } else {
    const sql = sqlHistory;

    const result = await DBCon.MAIN.query(sql);
    const sql2 = 'select goods_code, goods_name from ims_goods ';
    const result2 = await DBCon.MAIN.query(sql2);
    // result[0] - data array
    // result[1] - database meta data

    res.render('history', { title: 'IMS : history', user, histories: result[0], goods: result2[0] });
  }
});

router.get('/deleteStock', async function (req, res, next) {
  const session = req.session;
  const historyId = Number(req.query.history_id);
  const sql = `delete from ims_history where history_id = ? `;
  const params = [historyId];

  try {
    await DBCon.MAIN.query(sql, params);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/history');
});

// post
router.post('/join', async function (req, res, next) {
  const loginId = req.body.join_id;
  const loginPs = req.body.join_ps;
  const sql = `
    insert into ims_member(login_id, member_password, reg_date)
    values(?, password(?), now())
  `;
  const params = [loginId, loginPs];

  await DBCon.MAIN.query(sql, params);
  res.redirect('/');

  // console.log('id', loginId);
  // console.log('ps', loginPs);
  // res.render('history', { title: 'IMS : history' });
});

router.post('/saveStock', async function (req, res, next) {
  const session = req.session;
  const code = req.body.code;
  const name = req.body.name;
  const exDate = req.body.ex_date;
  const oi = req.body.oi;
  const count = req.body.count;
  const sql = `INSERT INTO ims_history(deal_period, state, count, reg_date, goods_code, login_id)VALUES(?, ?, ?, now(), ?, ?)`;
  const params = [exDate, oi, count, code, session['IMS_USER'].login_id];

  try {
    await DBCon.MAIN.query(sql, params);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/history');
});

router.post('/loginProcess', async function (req, res, next) {
  const loginId = req.body.login_id;
  const loginPs = req.body.login_ps;
  const sql = `select * from ims_member where login_id = ? and member_password = password(?)  `;
  const params = [loginId, loginPs];

  const result = await DBCon.MAIN.query(sql, params);
  const members = result[0];

  if (Array.isArray(members) && members.length > 0) {
    const session = req.session;
    const userData = members[0];

    session['IMS_USER'] = userData;
    session.save();

    res.json(userData);
  } else {
    res.end('F');
  }

  // console.log('id', loginId);
  // console.log('ps', loginPs);
  // res.render('history', { title: 'IMS : history' });
});

module.exports = router;

router.post('/getstock', async function (req, res, next) {
  const history_id = req.body.history_id;
  const sql = sqlHistory;
  const params = [history_id];

  const result = await DBCon.MAIN.query(sql, params);
  const history = result[0][0];

  res.json(history);
  // console.log('id', loginId);
  // console.log('ps', loginPs);
  // res.render('history', { title: 'IMS : history' });
});

module.exports = router;
