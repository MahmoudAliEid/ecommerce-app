product_model = require("../model/productModel");

NewProduct = async (req, res, next) => {
  const product = await product_model.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

getProducts = async (req, res, next) => {
  const products = await product_model.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};
getSingleProducts = async (req, res, next) => {
  const products = await product_model.findById(req.params.id);
  if (!products) {
    res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
  res.status(201).json({
    success: true,
    products,
  });
};
UpdateSingleProduct = async (req, res, next) => {
  let products = await product_model.findById(req.params.id);
  if (!products) {
    res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
  products = await product_model.findByIdAndUpdate(req.params.id, req.body);
  res.status(201).json({
    success: true,
    products,
  });
};

module.exports = {
  getProducts,
  NewProduct,
  getSingleProducts,
  UpdateSingleProduct,
};