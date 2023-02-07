const express = require("express");
const router = express.Router();
const orgController = require("../controllers/org_controller");
router.get("/name", orgController.organization);
module.exports = router;
