const express = require("express");
var router = express.Router();
const {
    resigteration,
    login,
    logout,
    getUserProfile,
    Update_Password,
    Update_profile,
} = require("../controller/authenUser");
const { auth } = require("../middleware/auth");

router.route("/register").post(resigteration);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(auth, getUserProfile);
router.route("/updatePassword").put(auth, Update_Password);
router.route("/updateProfile").put(auth, Update_profile);
module.exports = router;