const express = require("express");
var router = express.Router();
const {
  new_order,
  getSingleOrder,
  myorders,
  AllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/order");
const { auth, Roles } = require("../middleware/auth");

router.route("/order/new").post(auth, new_order);
router.route("/order/:id").get(auth, getSingleOrder);
router.route("/orders/me").get(auth, myorders);
router.route("/admin/orders/").get(auth, Roles("Admin"), AllOrders);
router.route("/admin/orders/:id").put(auth, Roles("Admin"), updateOrder);
router
  .route("/admin/order/delete/:id")
  .delete(auth, Roles("admin"), deleteOrder);

module.exports = router;
