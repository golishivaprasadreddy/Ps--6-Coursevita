"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken = (id) => {
    var _a;
    return (0, jsonwebtoken_1.sign)({ id }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "", {
        expiresIn: "30d",
    });
};
exports.generateToken = generateToken;
