const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("users", {
    title: "Profile",
  });
};

module.exports.signin = function (req, res) {
  return res.render("signin", {
    title: "signin",
  });
};

module.exports.signup = function (req, res) {
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

module.exports.creaseSession = function (req, res) {};
