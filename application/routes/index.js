var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'CSC 317 App', 
    name:"Ethan Zheng" });

  // let cssPath = path.resolve(css, "public");

  // index.use(express.static(cssPath));
});

router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Registration'  });
});

router.get('/postvideo', function(req, res, next) {
  res.render('postvideo', { title: 'Post A Video' });
});

router.get('/viewpost', function(req, res, next) {
  res.render('viewpost', { title: 'Post Details' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login To Flight' });
});





module.exports = router;
