const createError = require("http-errors");
const express = require("express");
const favicon = require('serve-favicon');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "views/layouts"), //where to look for layouts
    partialsDir: path.join(__dirname, "views/partials"), // where to look for partials
    extname: ".hbs", //expected file extension for handlebars files
    defaultLayout: "layout", //default layout for app, general template for all pages in app
    helpers: {
      // DetectPage: currentPage,
      ifEquals : function(pageTitle, arg2, options) {
        // return (pageTitle === arg2) ? options.fn(this) : options.inverse(this);
        console.log(pageTitle, arg2, options);
    },
      // cPage : 
    }, //adding new helpers to handlebars for extra functionality
  })
);

let pageTitle = "CSC 317 App"; // router.res.title

function currentPage(pageTitle)  { 
  if (pageTitle === "Registration") {
    // registrationactive = true;
    // return registrationactive;
    return 1;
  }
  if (pageTitle === "CSC 317 App") {
    // indexactive = true;
    // return indexactive;
    return "1";
  }
  if (pageTitle === "Post A Video") {
    postvideoactive = true;
    return postvideoactive;
  }
  if (pageTitle === "Post Details") {
    postdetailsactive = true;
    return postdetailsactive;
  }
  if (pageTitle === "Login To Flight") {
    loginactive = true;
    return loginactive;
  }
}

// const handlebars = require('handlebars');

// handlebars.registerHelper('ifEquals', function(pageTitle, arg2, options) {
//     return (pageTitle == arg2) ? options.fn(this) : options.inverse(this);
// });


let registrationactive = false;
let indexactive = false;
let postvideoactive = false;
let postdetailsactive = false;
let loginactive = false;



// if-else in handlebars that takes 1, 2,3 and adjusts the navbar active status 


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter); // route middleware from ./routes/index.js
app.use("/users", usersRouter); // route middleware from ./routes/users.js


/**
 * Catch all route, if we get to here then the 
 * resource requested could not be found.
 */
app.use((req,res,next) => {
  next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
})
  

/**
 * Error Handler, used to render the error html file
 * with relevant error information.
 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
