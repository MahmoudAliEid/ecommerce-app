const express = require("express");
const upload = require("../middleware/multer");
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
  forgetPassword,
  resetPassword,
} = require("../controller/authenUser");
const { auth, Roles } = require("../middleware/auth");

router.route("/register").post(upload.single("picture"), resigteration);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/admin/Users").get(auth, Roles("Admin"), getAllUsers);
router
  .route("/admin/User/:id")
  .get(auth, Roles("Admin"), getUserById)
  .put(auth, Roles("Admin"), Update_User)
  .delete(auth, Roles("Admin"), DeleteUserById);
router.route("/me").get(auth, getUserProfile);
router.route("/updatePassword").put(auth, Update_Password);
router.route("/updateProfile").put(auth, Update_profile);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").post(resetPassword);
module.exports = router;
