var mysql = require('mariadb');

var con = mysql.createConnection({
  host: "127.0.0.1",
//   database:"lerrosit_userinput",
  user: "root",
  password: "root",
  connectTimeout:60000
}).then(res => console.log(res)).catch(err => console.log(err));

// con.(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
// :/var/lib/mysql/mysql.sock