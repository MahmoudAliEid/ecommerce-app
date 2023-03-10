const express = require("express");
var router = express.Router();
const { new_order } = require("../controller/order");
const { auth, Roles } = require("../middleware/auth");

router.route("/order/new").post(auth, new_order);

module.exports = router;