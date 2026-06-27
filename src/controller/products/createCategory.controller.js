const Category = require("../../model/product/category.model");
const createCategory = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const { name } = req.body;
    const category = new Category({
      name,
    });
    await category.save();
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create category",
      error,
    });
  }
};
module.exports = createCategory;
