const Product = require("../../model/product/product.model");
const fs = require("fs");
const upload = require("../../utils/cloudinary");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, price, category, brand, stock, images } =
      req.body;
    if (!name || !description || !price || !category || !brand || !stock) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    let uploadResult;
    if (req.files) {
      uploadResult = await Promise.all(
        req.files.map(async (file) => {
          try {
            const result = await upload(file.path, {
              folder: "products",
            });
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
            return result.secure_url;
          } catch (error) {
            console.log(error);
            return null;
          } finally {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          }
        }),
      );
    }
    let newImages = uploadResult;

    let finalImages = [...images, ...newImages];

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        images: finalImages,
        category,
        brand,
        stock,
      },
      {
        new: true,
      },
    );
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error,
    });
  }
};

module.exports = updateProduct;
