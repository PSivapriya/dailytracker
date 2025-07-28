const express = require("express");
const { login, register } = require("../Controllers/authController"); 

const userRouter = express.Router();

userRouter.post("/signup",register);
userRouter.post("/login", login);

module.exports = userRouter;