"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
const server_1 = __importDefault(require("./server"));
(0, db_1.connect)();
const PORT = process.env.PORT || 3000;
server_1.default.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
