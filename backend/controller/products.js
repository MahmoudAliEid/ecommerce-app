const CatchError = require("../middleware/catchAsyncError");
class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  newProduct = CatchError(async (req, res, next) => {
    const productData = req.body;
    const newProduct = await this.productService.createProduct(productData);
    res.status(201).json(newProduct);
  });

  getProducts = CatchError(async (req, res, next) => {
    const query = req.query;
    const products = await this.productService.fechProducts(query);
    res.status(200).json(products);
  });

  getSingleProduct = CatchError(async (req, res, next) => {
    const productId = req.params.id;
    const product = await this.productService.getSingleProduct(productId);
    res.status(200).json(product);
  });

  updateSingleProduct = CatchError(async (req, res, next) => {
    const productId = req.params.id;
    const updatedData = req.body;
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updatedData
    );
    res.status(200).json(updatedProduct);
  });

  deleteSingleProduct = CatchError(async (req, res, next) => {
    const productId = req.params.id;
    await this.productService.deleteProduct(productId);
    res
      .status(200)
      .json({ success: true, message: "The product has been deleted!" });
  });
}

module.exports = ProductController;
