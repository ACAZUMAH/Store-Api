"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controller"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the store API'
    });
});
router.route('/api/products')
    .post(controller_1.default.postProducts)
    .get(controller_1.default.getAllProducts);
router.route('/api/products/:id')
    .get(controller_1.default.getSingleProduct)
    .put(controller_1.default.updateProduct)
    .delete(controller_1.default.deleteProduct);
exports.default = router;
