const express = require("express");
const registerUser = require("../../controller/user/registerUser.controller");
const loginUser = require("../../controller/user/loginUser.controller");
const getUser = require("../../controller/user/getUser.controller");
const verifyToken = require("../../middleware/verifyToken.middleware");
const deleteUser = require("../../controller/user/delete.controller");
const multer = require("multer");
const updateProfile = require("../../controller/user/update.controller");
const forgotPassword = require("../../controller/user/forgotPassword.controller");
const resetPassword = require("../../controller/user/resetPassword.controller");
const upload = multer({ dest: "uploads/" });

const userRouter = express.Router();

userRouter.post("/register", upload.single("profileImage"), registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/user", verifyToken, getUser);
userRouter.delete("/delete", verifyToken, deleteUser);
userRouter.put("/update", verifyToken, updateProfile);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);
module.exports = userRouter;
