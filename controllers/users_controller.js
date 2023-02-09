const { response } = require("express");
const User = require("../models/user");
module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render("users", {
          title: "User Profile",
          user: user,
        });
      } else {
        return res.redirect("/users/signin");
      }
    });
  } else {
    return res.redirect("/users/signin");
  }
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
  // Check if password entered matches with confirm password
  // if (req.body.password != req.body.confirm_password) {
  //   return res.redirect("back");
  // }

  // Adding user info to database collection named User
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user while signing up");
      return;
    }
    // if user doesnt exist, create user and go to signin page
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating the user while signing up");
          return;
        }
        return res.redirect("/users/signin");
      });
      // if user already exists get back to sign up page
    } else {
      return res.redirect("back");
    }
  });
};

// for signin
module.exports.creaseSession = function (req, res) {
  // Find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in signing in");
      return;
    }
    // handle user found
    if (user) {
      // if user found handle mismatches in password
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      // create session
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      // handle user not found
      return res.redirect("back");
    }
  });
};

module.exports.signout = function (req, res) {
  // if (req.cookies.user_id) {
  //   res.cookies.user_id = null;
  //   return res.redirect("/users/signin");
  // }
  res.clearCookie("user_id");
  return res.redirect("/users/signin");
};
