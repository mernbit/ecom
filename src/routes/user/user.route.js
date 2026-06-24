const express = require("express");
const registerUser = require("../../controller/user/registerUser.controller");
const loginUser = require("../../controller/user/loginUser.controller");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
module.exports = userRouter;
