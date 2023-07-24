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
  res.render('registration', { title: 'CSC 317 App', name:"Ethan Zheng" });
});

router.get('/postvideo', function(req, res, next) {
  res.render('postvideo', { title: 'CSC 317 App', name:"Ethan Zheng" });
});

router.get('/viewpost', function(req, res, next) {
  res.render('viewpost', { title: 'CSC 317 App', name:"Ethan Zheng" });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'CSC 317 App', name:"Ethan Zheng" });
});





module.exports = router;
