var express = require('express');
const { isLoggedIn } = require("../middleware/auth");

const { makeThumbnail, getPostById } = require('../middleware/posts');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'CSC 317 App', name: "Ethan Zheng" });
});

router.get('/registration', function (req, res, next) {
  res.render('registration', { title: 'Registration', css: ["style.css"] });
});


router.get('/postvideo', isLoggedIn, function (req, res, next) {
  res.render('postvideo', { title: 'Post A Video', css: ["style.css"] });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login To Flight', css: ["style.css"] });
});

router.get("/viewpost/:id(\\d+)", getPostById, function (req, res, next) {
  res.render('viewpost', {
    title: `Post Details ${req.params.id}`,
    css: ["style.css"]
  });
});

const mysql = require('mysql2');

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
    var [results, _] = await pool.query(`select * from users`);
    console.log(results);
  }
  catch (err) {
    console.log(err);
  }
}

runSQL();
console.log();

module.exports = router;