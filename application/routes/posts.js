var express = require('express');
var router = express.Router();
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/create', function(req,res,next){
    console.log(req.file);
    console.log(req.body);
    res.end();
});

module.exports = router;