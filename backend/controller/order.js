const Order = require("../model/Order");
const Product = require("../model/productModel");
const CatchError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandle");

new_order = CatchError(async(req, res, next) => {
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

getSingleOrder = CatchError(async(req, res, next) => {
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

myorders = CatchError(async(req, res, next) => {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json({
        success: true,
        orders,
    });
});

module.exports = { new_order, getSingleOrder, myorders };