var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const db = require('../conf/database');
const validator = require('validator');
// const { doesUsernameExist, doesEmailExist, checkUsername, checkEmail, checkPassword } = require('../middleware/validation');


router.post('/registration',
  // checkUsername,
  // checkEmail,
  // checkPassword,
  // doesUsernameExist,
  // doesEmailExist,
  async function (req, res, next) {
    var { username, email, password } = req.body;

    console.log(req);


    try {
      //  ss validation, unique & rules check
      // users can enter "username=sample OR 1=1; DROP users" to mess up db, so check
      var [results, _] = await db.execute(`select id from users where username=?`,
        [username]);
      if (results && results.length > 0) {
        console.log("username already exists");
        return res.redirect('/registration');
      }

      var [results, _] = await db.execute(`select id from users where email=?`,
        [email]);
      if (results && results.length > 0) {
        console.log("email already exists");
        return res.redirect('/registration');
      }

      var hashedPassword = await bcrypt.hash(password, 5);
      var [insertResult, _] = await db.execute(
        `INSERT INTO users (username, email, password) VALUE (?,?,?);`,
        [username, email, hashedPassword]
      );

      if (insertResult && insertResult.affectedRows == 1) {
        return res.redirect('/login');
      }
      else {
        return res.redirect('/registration');
      }


      return res.send(`${username} and ${email} is available`);



    } catch (err) {
      next(err);
    }
  })

router.post("/login", async function (req, res, next) {
  var { username, password } = req.body;
  console.log(req.body);
  try {
    var [results, _] = await db.execute(
      `select id, username, email, password from users where username=?`,
      [username]
    );
    const user = results[0];
    if (!user) {
      req.flash("error", "Invalid Login Credentials. Please Try Again.");
      return req.session.save(function (err) {
        return res.redirect("/login");
      });
    }

    var passwordsMatch = await bcrypt.compare(password, user.password);

    console.log(password, user.password);

    console.log({
      userId: user.id,
      username: user.username,
      email: user.email
    });

    if (passwordsMatch) {
      req.session.user = {
        userId: user.id,
        username: user.username,
        email: user.email,
      }
      req.flash("success", "You are successfully logged in.");
      return req.session.save(function (err) {
        return res.redirect("/");
      });
    } else {
      req.flash("error", "Invalid Login Credentials. Please Try Again.");
      return req.session.save(function (err) {
        return res.redirect("/login");
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) next(err);
    return res.redirect("/");
  });
});




module.exports = router;
