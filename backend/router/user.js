const express = require("express");
var router = express.Router();
const {resigteration} = require("../controller/products");

router.route("/register").post(resigteration);
