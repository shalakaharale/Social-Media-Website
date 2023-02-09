const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //    find the user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in finding user");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("user not found");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serializing the user : deciding which key to be kept in cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user:using the id in the cookie to find the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user");
      return done(err);
    }
    return done(null, user);
  });
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in pass the request to the controller actions
  if (req.isAuthenticated()) {
    return next();
  }

  //   if the user is not signed in
  return res.redirect("/users/signin");
};

// sets the signed in users for further pages
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated) {
    // req.user already has the current signed in user, now sending it to the locals for the views
    res.locals.user = req.user;
  }
  next();
};
module.exports = passport;
