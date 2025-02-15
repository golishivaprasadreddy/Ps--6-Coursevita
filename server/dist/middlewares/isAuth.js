"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuth = (req, res, next) => {
    var _a;
    try {
        const user = (0, jsonwebtoken_1.verify)(req.cookies.token, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "");
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // @ts-ignore
        req.userId = user;
        return;
    }
    catch (error) {
        return null;
    }
};
exports.isAuth = isAuth;
