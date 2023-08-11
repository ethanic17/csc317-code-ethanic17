const db = require("../conf/database");
const validator = require('validator');

module.exports = {
    checkUsername: function (req, res, next) {
        next();
    },
    checkEmail: function (req, res, next) {
        next();
    },
    checkPassword: function (req, res, next) {
        var { password, checkPassword } = req.body;
        if (validator.isStrongPassword(password) && password == checkPassword) {
            next();
        } else {
            req.flash("perror", "Invalid password");
            return res.redirect('/registration');
        }
        next();
    },
    doesUsernameExist: async function (req, res, next) {
        var { username } = req.body;
        var [results, _] = await db.execute(`select id from users where username=?`,
            [username]);
        if (results && results.length > 0) {
            console.log("username already exists");
            return res.redirect('/registration');
        }
        else {
            next();
        }
    },
    doesEmailExist: async function (req, res, next) {
        var { email } = req.body;
        var [results, _] = await db.execute(`select id from users where email=?`,
            [email]);
        if (results && results.length > 0) {
            console.log("email already exists");
            return res.redirect('/registration');
        }
        else {
            next();
        }
    },
}