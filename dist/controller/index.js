"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAllProducts = exports.postProducts = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const products_1 = __importDefault(require("../helpers/products"));
/**
 * controller to post products
 * @param req request object
 * @param res response object
 * @returns product
 * @throws error if product is not posted
 */
const postProducts = async (req, res) => {
    const product = await products_1.default.addProduct({ ...req.body });
    if (product.lentgh === 0) {
        throw new http_errors_1.default.BadRequest('Unable to post product');
    }
    return res.status(201).json({ 'updated': product });
};
exports.postProducts = postProducts;
/**
 * controller to get all products
 * @param req Request object
 * @param res Response object
 * @returns list of products
 * @throws error if no products found
 */
const getAllProducts = async (req, res) => {
    const products = await products_1.default.getProducts({ ...req.query });
    if (products.length === 0) {
        throw new http_errors_1.default.NotFound('No products found');
    }
    return res.status(200).json({ 'products': products });
};
exports.getAllProducts = getAllProducts;
/**
 * constroller to get a single product
 * @param req Request object
 * @param res Response object
 * @returns a single product
 */
const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new http_errors_1.default.BadRequest('Invalid product id');
    }
    const product = await products_1.default.findProductById(id);
    return res.status(200).json({ 'product': product });
};
exports.getSingleProduct = getSingleProduct;
/**
 * controller to update a product
 * @param req Request object
 * @param res Response object
 * @returns updated product
 */
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const update = await products_1.default.updateProduct(id, { ...req.body });
    res.status(200).json({ 'message': update });
};
exports.updateProduct = updateProduct;
/**
 * constroller to delete a product
 * @param req Request object
 * @param res Response object
 * @returns deleted message
 */
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (await products_1.default.deleteProduct(id)) {
        res.status(200).json({ 'message': 'Product deleted' });
    }
};
exports.deleteProduct = deleteProduct;
exports.default = {
    getAllProducts: exports.getAllProducts,
    postProducts: exports.postProducts,
    updateProduct: exports.updateProduct,
    getSingleProduct: exports.getSingleProduct,
    deleteProduct: exports.deleteProduct
};
