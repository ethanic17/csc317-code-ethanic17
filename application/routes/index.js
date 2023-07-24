var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Ethan Zheng" });
});

router.get('/', function(req, res, next) {
  res.render('registration', { title: 'CSC 317 App', name:"Ethan Zheng" });
});

module.exports = router;
