var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Ethan Zheng" });
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Registration', css:["style.css"]  });
});

router.get('/postvideo', function(req, res, next) {
  res.render('postvideo', { title: 'Post A Video', css:["style.css"] });
});

router.get('/viewpost', function(req, res, next) {
  res.render('viewpost', { title: 'Post Details', css:["style.css"] });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login To Flight', css:["style.css"] });
});

module.exports = router;

const mysql = require('mysql2');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "csc317db",
});

conn.query("select 1+1", function(err, results) {
  if(err) {
    console.log(err);
  }
  else {
    console.log(results);
  }
})