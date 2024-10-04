"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const ajv_1 = __importDefault(require("ajv"));
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * validate data from the request body
 * @param data data to validate
 * @returns true
 * @throws error if data is invalid
 */
const validateData = async (data) => {
    const ajv = new ajv_1.default();
    const schema = {
        type: 'object',
        properties: {
            name: { type: 'string' },
            company: { type: 'string' },
            price: { type: 'number' },
            rating: { type: 'number' }
        },
        additionalProperties: false
    };
    const validate = ajv.compile(schema);
    const isValid = validate(data);
    if (!isValid)
        throw http_errors_1.default.BadRequest('Invalid input data');
    return true;
};
exports.validateData = validateData;
