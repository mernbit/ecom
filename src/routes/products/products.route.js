const express = require("express");
const multer = require("multer");
const verifyToken = require("../../middleware/verifyToken.middleware");
const createProduct = require("../../controller/products/createProduct.controller");
const createCategory = require("../../controller/products/createCategory.controller");
const getProducts = require("../../controller/products/getProducts.controller");
const deleteProduct = require("../../controller/products/delete.controller");
const editCategory = require("../../controller/products/editCategory.controller");
const updateProduct = require("../../controller/products/updateProduct.controller");
const getOne = require("../../controller/products/getOne.controller");
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
productRouter.get("/get/:id", getOne);
productRouter.delete("/delete/:id", verifyToken, deleteProduct);
productRouter.put("/category/edit/:id", verifyToken, editCategory);
productRouter.put(
  "/update/:id",
  verifyToken,
  upload.array("images", 5),
  updateProduct,
);
module.exports = productRouter;
