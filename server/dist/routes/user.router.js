"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/signup", user_controller_1.signupUser);
exports.userRouter.post("/signin", user_controller_1.signinUser);
