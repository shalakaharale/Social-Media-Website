const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");
router.get("/profile", userController.profile);
router.get("/signin", userController.signin);
router.get("/signup", userController.signup);
router.post("/create", userController.create);
router.post("/create-session", userController.creaseSession);
router.post("/signout", userController.signout);
module.exports = router;
