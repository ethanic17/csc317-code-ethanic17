module.exports = {
    isLoggedIn: function(req, res, next) {
        if(req.session.user) {
            next();
          } else {
            req.flash("error", "Error: You must be logged in to do that!");
            req.session.save(function(err){
              if(err) next(err);
              res.redirect('/login');
            });
          }
    }
}