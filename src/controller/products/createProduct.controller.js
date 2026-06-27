const Products = require("../../model/product/product.model");
const { upload } = require("../../utils/cloudinary");
const fs = require("fs");

const createProduct = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const files = req.files;

    if (files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // const uploadResult = [];
    // for (const f of files) {
    //   const result = await upload(f.path, {
    //     folder: "products",
    //   });
    //   uploadResult.push(result.secure_url);
    //   fs.unlinkSync(f.path);
    // }
    const uploadResult = await Promise.all(
      files.map(async (file) => {
        try {
          const result = await upload(file.path, {
            folder: "products",
          });
          return result.secure_url;
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "Failed to upload images",
            error,
          });
        } finally {
          fs.unlinkSync(file.path);
        }
      }),
    );
    const { name, quantity, price, category, description } = req.body;
    if (!name || !quantity || !price || !category || !description) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }
    const product = new Products({
      name,
      quantity,
      price,
      category,
      description,
      images: uploadResult,
      createdBy: req.user.id,
    });
    await product.save();
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create product",
      error,
    });
  }
};

module.exports = createProduct;
