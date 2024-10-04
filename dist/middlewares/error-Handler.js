"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ErrorHandler = (err, _req, res, _next) => {
    if (err instanceof http_errors_1.default.HttpError) {
        return res.status(err.statusCode).json({ errors: [{ message: err.message }] });
    }
    return res.status(500).json({ errors: [{ message: 'Internal Server Error!' }] });
};
exports.ErrorHandler = ErrorHandler;
exports.default = exports.ErrorHandler;
