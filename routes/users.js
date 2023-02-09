const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/users_controller");
router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/signin", userController.signin);
router.get("/signup", userController.signup);
router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  userController.createSession
);

router.get("/signout", userController.distroySession);
module.exports = router;
