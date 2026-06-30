const Products = require("../../model/product/product.model");

const getProducts = async (req, res) => {
  const { page, limit, search } = req.query;
  try {
    if (!page || !limit) {
      return res.status(400).json({
        message: "Please provide page and limit",
      });
    }
    if (search) {
      const products = await Products.find({
        name: { $regex: search, $options: "i" },
      })
        .populate("category", "name")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        products,
      });
    }
    const products = await Products.find()
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch products",
      error,
    });
  }
};

module.exports = getProducts;
