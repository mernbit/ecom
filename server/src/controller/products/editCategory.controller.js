const Category = require("../../model/product/category.model");

const editCategory = async (req, res) => {
  if (!req.user || req.user.role !== "admin" || !req.params.id) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    category.name = name;
    await category.save();
    return res
      .status(200)
      .json({ success: true, message: "Category updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = editCategory;
