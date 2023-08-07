const db1 = require('mysql2-promise')();
// const db2 = require('mysql2-promise')('insu_plus');

/**
 * MySQL Datasource 생성
 */
db1.configure({
  host: 'aws1.ehd.kr',
  user: 'sr_user',
  password: 'sr_user@ehd.kr',
  port: '3306',
  database: 'sr_db',
});

// db2.configure({
//     host    : config.DBMS2.ip,
//     user    : config.DBMS2.userId,
//     password: config.DBMS2.userPw,
//     port    : config.DBMS2.port,
//     database: config.DBMS2.database
// });

/**
 * 기존 쿼리를 페이징 처리 가능한 쿼리로 변경해주는 함수
 * DBMMS 에 따라 구현 쿼리 변경
 */
function convertPagenationQuery(query, pagenation) {
  let buff;
  let limit;
  let offset;

  if (!pagenation) return query;

  offset = (pagenation.getCurrentPageNumber() - 1) * pagenation.getDataCountPerPage();
  limit = pagenation.getDataCountPerPage();

  buff = `
        ${query}
        limit ${limit} offset ${offset}
    `;

  return buff;
}

module.exports = {
  MAIN: db1,
  // SECONDARY : db2,
  convertPagenationQuery,
};
