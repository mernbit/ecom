/* Attention required. 

  This api replaces the old pictures with new picture. After debugging I found exactly whats causing this problem. Make sure to send old data along with the new data otherwise it will keep replacing. 
  this is causing the existing images to go "null"...
*/

const Product = require("../../model/product/product.model");
const fs = require("fs");
const { upload } = require("../../utils/cloudinary");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, price, category, quantity, images } = req.body;

    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({
        success: false,

        message: "Please provide all required fields",
      });
    }

    let uploadResult;
    if ((req.files?.length || 0) + (images?.length || 0) > 5) {
      return res.status(400).json({
        success: false,
        message: "You can only have 5 images in total",
      });
    }
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
    let finalImages;

    const product = await Product.updateOne(
      { _id: id },
      {
        name,
        description,
        price,
        images: finalImages,
        category,
        quantity,
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
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error,
    });
  }
};

module.exports = updateProduct;
