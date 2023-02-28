product_model = require("../model/productModel");
Api_feature = require("../utils/api_feature");
const ErrorHandler = require("../utils/ErrorHandle");
const CatchError = require("../middleware/catchAsyncError");

NewProduct = CatchError(async(req, res, next) => {
    req.body.user = req.user.id;
    const product = await product_model.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

getProducts = CatchError(async(req, res, next) => {
    const resPage = 4;
    const prodCount = await product_model.countDocuments();
    const api_feature = new Api_feature(product_model.find(), req.query)
        .search()
        .filter()
        .pagination(resPage);
    const products = await api_feature.query;

    res.status(200).json({
        success: true,
        count: products.length,
        prodCount,
        products,
    });
});
getSingleProducts = CatchError(async(req, res, next) => {
    const products = await product_model.findById(req.params.id);
    if (!products) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(201).json({
        success: true,
        products,
    });
});
UpdateSingleProduct = CatchError(async(req, res, next) => {
    let products = await product_model.findById(req.params.id);
    if (!products) {
        return next(new ErrorHandler("Product not found", 404));
    }
    products = await product_model.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
        success: true,
        products,
    });
});
deleteSingleProduct = CatchError(async(req, res, next) => {
    let products = await product_model.findById(req.params.id);
    if (!products) {
        return next(new ErrorHandler("Product not found", 404));
    }
    await products.remove();
    res.status(201).json({
        success: true,
        message: "product is deleted",
    });
});

module.exports = {
    getProducts,
    NewProduct,
    getSingleProducts,
    UpdateSingleProduct,
    deleteSingleProduct,
};