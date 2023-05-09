const { productModel, productCategoryEnum } = require("../model/productModel");
const apiFeature = require("../utils/apiFeature");
class ProductService {
  async createProduct(productData) {
    // Logic to create a new product and store it in the database using the productModel
    const newProduct = await productModel.create(productData);
    return newProduct;
  }

  async fechProducts(query) {
    // Logic to fetch all products from the database using the productModel
    const resPerPage = 4;
    const prodCount = await productModel.countDocuments();
    const api_Feature = new apiFeature(productModel.find(), query)
      .search()
      .filter()
      .pagination(resPerPage);
    const products = await api_Feature.query;

    return { products, prodCount };
  }

  async getSingleProduct(productId) {
    // Logic to fetch a single product by its ID from the database using the productModel
    const product = await productModel.findById(productId);
    return product;
  }

  async updateProduct(productId, updatedData) {
    // Logic to update a product with the provided ID in the database using the productModel
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updatedData,
      {
        new: true, // Return the updated product
        runValidators: true, // Run the model validators on the updated data
      }
    );
    return updatedProduct;
  }

  async deleteProduct(productId) {
    // Logic to delete a product with the provided ID from the database using the productModel
    await productModel.findByIdAndDelete(productId);
    // Perform any necessary cleanup or cascading deletion if applicable
  }
}

module.exports = {
  ProductService,
};
