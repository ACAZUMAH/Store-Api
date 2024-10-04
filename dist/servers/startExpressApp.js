"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_1 = __importDefault(require("express"));
const error_Handler_1 = __importDefault(require("../middlewares/error-Handler"));
const router_1 = __importDefault(require("../router"));
const limiterOptions = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
const startExpressApp = async () => {
    const app = (0, express_1.default)();
    app.set('trust proxy', 1);
    app.use(limiterOptions);
    app.use(express_1.default.json());
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use((0, xss_clean_1.default)());
    app.use(router_1.default);
    app.use(error_Handler_1.default);
    app.all('*', (req, res) => {
        res.status(404).json({ message: 'Unable to find the requested resource!' });
    });
    return app;
};
exports.default = startExpressApp;
