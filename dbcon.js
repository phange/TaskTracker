var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_phang',
  password        : '8947',
  database        : 'cs361_phang'
});
module.exports.pool = pool;
