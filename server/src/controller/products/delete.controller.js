const Products = require("../../model/product/product.model");

const deleteProduct = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await product.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to delete product",
      error,
    });
  }
};

module.exports = deleteProduct;
