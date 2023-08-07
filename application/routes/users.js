var express = require('express');
var router = express.Router();
const db = require('../conf/database');

//localhist:3000/users/registration
router.post('/registration', async function(req, res, next) {
  // console.log(req.body);
  // res.end();

  var {username,email,password} = req.body;
  try {
    //  ss validation, unique & rules check
    // users can enter "username=sample OR 1=1; DROP users" to mess up db, so check
    var [results, _ ] = await db.execute(`select id from users where username=?`, 
    [username]);
    if(results && results.length > 0) {
      console.log("username already exists");
      return res.redirect('/regisration');
    }

    var [results, _ ] = await db.execute(`select id from users where email=?`, 
    [email]);
    if(results && results.length > 0) {
      console.log("email already exists");
      return res.redirect('/regisration');
    }

    // insert into db
    var [insertResult, _] = await db.execute(`INSERT INTO users (username, email, password) VALUE (?,?,?);`, [username, email, password])
    if (insertResult && insertResult.affectedRows == 1) {
      return res.redirect('/login');
    }
    else {
      return res.redirect('/registration');
    }


    return res.send(`${username} and ${email} is available`);
   
    

  } catch(err) {
    next(err);
  }
})

module.exports = router;
