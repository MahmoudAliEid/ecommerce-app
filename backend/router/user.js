const express = require("express");
var router = express.Router();
const {resigteration, login} = require("../controller/authenUser");

router.route("/register").post(resigteration);
router.route("/login").post(login);
module.exports = router;