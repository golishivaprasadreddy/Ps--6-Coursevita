"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinUser = exports.signupUser = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = require("bcryptjs");
const generateToken_1 = require("../utils/generateToken");
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    const hashPassword = (0, bcryptjs_1.hashSync)(password, 10);
    const user = yield user_model_1.userModel.create({ email, password: hashPassword, fullName });
    const token = (0, generateToken_1.generateToken)(user._id.toString());
    res.status(201).json({ token });
    return;
});
exports.signupUser = signupUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    const user = yield user_model_1.userModel.findOne({ email });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    if (!(0, bcryptjs_1.compareSync)(password, user.password)) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
    }
    const token = (0, generateToken_1.generateToken)(user._id.toString());
    res.status(200).json({ token });
    return;
});
exports.signinUser = signinUser;
