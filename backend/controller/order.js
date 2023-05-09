const Order = require("../model/Order");
const { productModel } = require("../model/productModel");
const CatchError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

new_order = CatchError(async (req, res, next) => {
  const {
    orderltems,
    shippinglnfo,
    itemsPrice,
    taxprice,
    shippingprice,
    totalprice,
    paymentInfo,
  } = req.body;
  const order = await Order.create({
    orderltems,
    shippinglnfo,
    itemsPrice,
    taxprice,
    shippingprice,
    totalprice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

getSingleOrder = CatchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

myorders = CatchError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    orders,
  });
});

//Get all orders-Admin
AllOrders = CatchError(async (req, res, next) => {
  const orders = await Order.find();

  //To display Total
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalprice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Update order-Admin
updateOrder = CatchError(async (req, res, next) => {
  const order = await Order.findById({ _id: req.params.id });

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  for (const item of order.orderltems) {
    await updateStock(item.product, item.quantity);
  }

  order.paymentlnfo.orderStatus = req.body.orderStatus;
  // order.paymentlnfo.deliveredAt = Date.now();
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order,
    message: "The order has been updated successfully!",
  });
});

// Create Update Stock Function
async function updateStock(id, quantity) {
  const product = await productModel.findById(id);

  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//Delete order-Admin
deleteOrder = CatchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(" NO Order found with this ID !!", 404));
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});

module.exports = {
  new_order,
  getSingleOrder,
  myorders,
  AllOrders,
  updateOrder,
  deleteOrder,
};
