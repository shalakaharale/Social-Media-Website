const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("users", {
    title: "Profile",
  });
};

module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signin", {
    title: "signin",
  });
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signup", {
    title: "signup",
  });
};

module.exports.create = function (req, res) {
  // if (req.body.password != req.body.confirm_password) {
  //   return res.redirect("back");
  // }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user while signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating the user while signing up");
          return;
        }
        return res.redirect("/users/signin");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  return res.redirect("/users/profile");
};

module.exports.distroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/users/signin");
  });
};
