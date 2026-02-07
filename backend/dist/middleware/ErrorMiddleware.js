"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof ApiError_1.default ? err.statusCode : (err.statusCode || 500);
    const status = err instanceof ApiError_1.default ? err.status : (err.status || 'error');
    console.error(`[Error] ${err.message}`);
    if (statusCode === 500) {
        console.error(err.stack);
    }
    res.status(statusCode).json({
        status: status,
        message: err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};
exports.default = errorHandler;
