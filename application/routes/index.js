var express = require('express');
const { isLoggedIn } = require("../middleware/auth");
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Ethan Zheng" });
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Registration', css:["style.css"]  });
});


router.get('/postvideo', isLoggedIn, function(req, res, next) {
  res.render('postvideo', { title: 'Post A Video', css:["style.css"] });
});

// router.get('/viewpost', function(req, res, next) {
//   res.render('viewpost', { title: 'Post Details', css:["style.css"] });
// });
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login To Flight', css:["style.css"] });
});

module.exports = router;

const mysql = require('mysql2');
// const { isLoggedIn } = require('../middleware/auth');

var pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "csc317db",
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0
}).promise();


async function runSQL() {
  try {
    var[results, _] = await pool.query(`select * from users`);
    console.log(results);
  }
  catch(err) {
    console.log(err);
  }
}

runSQL();
console.log();

// pool.query(`select * from users`) 
//     .then(function([results, fields]) {
//       console.log(results);
//       return pool.query();
//     })
//     .catch(function() {

//     })