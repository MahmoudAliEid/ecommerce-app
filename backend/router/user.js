const express = require("express");
var router = express.Router();
const {
  resigteration,
  login,
  logout,
  getUserProfile,
  Update_Password,
  Update_profile,
  getAllUsers,
  getUserById,
  Update_User,
  DeleteUserById,
} = require("../controller/authenUser");
const {auth, Roles} = require("../middleware/auth");

router.route("/register").post(resigteration);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("admin/Users").get(auth, Roles("Admin"), getAllUsers);
router
  .route("admin/User/:id")
  .get(auth, Roles("Admin"), getUserById)
  .put(auth, Roles("Admin"), Update_User)
  .delete(auth, Roles("Admin"), DeleteUserById);
router.route("/me").get(auth, getUserProfile);
router.route("/updatePassword").put(auth, Update_Password);
router.route("/updateProfile").put(auth, Update_profile);
module.exports = router;