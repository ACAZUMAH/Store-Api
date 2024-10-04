"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const startExpressApp_1 = __importDefault(require("./startExpressApp"));
const startServer = async () => {
    const app = await (0, startExpressApp_1.default)();
    const server = http_1.default.createServer(app);
    const PORT = process.env.PORT || 3500;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
exports.default = startServer;
