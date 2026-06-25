const express = require("express");
const registerUser = require("../../controller/user/registerUser.controller");
const loginUser = require("../../controller/user/loginUser.controller");
const getUser = require("../../controller/user/getUser.controller");
const verifyToken = require("../../middleware/verifyToken.middleware");
const deleteUser = require("../../controller/user/delete.controller");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/user", verifyToken, getUser);
userRouter.delete("/delete", verifyToken, deleteUser);
module.exports = userRouter;
