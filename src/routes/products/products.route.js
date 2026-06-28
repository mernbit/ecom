const express = require("express");
const multer = require("multer");
const verifyToken = require("../../middleware/verifyToken.middleware");
const createProduct = require("../../controller/products/createProduct.controller");
const createCategory = require("../../controller/products/createCategory.controller");
const getProducts = require("../../controller/products/getProducts.controller");
const deleteProduct = require("../../controller/products/delete.controller");
const editCategory = require("../../controller/products/editCategory.controller");
const productRouter = express.Router();
const upload = multer({ dest: "uploads/" });

productRouter.post(
  "/create",
  upload.array("images", 5),
  verifyToken,
  createProduct,
);
productRouter.post("/category/create", verifyToken, createCategory);
productRouter.get("/get", getProducts);
productRouter.delete("/delete/:id", verifyToken, deleteProduct);
productRouter.put("/category/edit/:id", verifyToken, editCategory);
module.exports = productRouter;
