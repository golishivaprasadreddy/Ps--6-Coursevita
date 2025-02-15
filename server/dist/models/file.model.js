"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileModel = void 0;
const mongoose_1 = require("mongoose");
const FileSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    }
});
exports.fileModel = (0, mongoose_1.model)("File", FileSchema);
