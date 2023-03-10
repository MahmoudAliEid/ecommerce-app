const Order = require("../model/Order");
const Product = require("../model/productModel");
const CatchError = require("../middleware/catchAsyncError");

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
module.exports = { new_order };