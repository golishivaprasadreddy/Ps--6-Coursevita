"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    files: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "File",
    }
});
exports.userModel = (0, mongoose_1.model)("User", UserSchema);
