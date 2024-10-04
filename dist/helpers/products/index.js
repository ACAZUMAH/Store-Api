"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.findProductById = exports.addProduct = void 0;
const mongoose_1 = require("mongoose");
const http_errors_1 = __importDefault(require("http-errors"));
const validate_products_1 = require("./validate-products");
const products_1 = __importDefault(require("../../models/products"));
/**
 * add product to the database
 * @param data product data to be added
 * @returns products
 */
const addProduct = async (data) => {
    await (0, validate_products_1.validateData)(data);
    const product = await products_1.default.create({ ...data });
    return product;
};
exports.addProduct = addProduct;
/**
 * find product by id
 * @param id product id
 * @returns prouduct found by id
 */
const findProductById = async (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw http_errors_1.default.BadRequest('Invalid product id');
    }
    const product = await products_1.default.findById(id);
    return product;
};
exports.findProductById = findProductById;
/**
 * getting products and paging, limiting, sorting and filtering
 * @param query query parameters
 * @returns the list of products
 */
const getProducts = async (query) => {
    const { page, limit, sort, name, company } = query;
    const queyObject = {};
    if (name) {
        queyObject.name = { $regex: name, $options: 'i' };
    }
    if (company) {
        queyObject.company = company;
    }
    let result = products_1.default.find(queyObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createdAt');
    }
    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;
    result = result.skip(skip).limit(limits);
    const product = await result;
    return product;
};
exports.getProducts = getProducts;
/**
 * update product
 * @param id product id
 * @param data product data to be updated
 * @returns updated product
 * @throws error if product is not updated
 */
const updateProduct = async (id, data) => {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw http_errors_1.default.NotFound('No product with this id found');
    }
    await (0, validate_products_1.validateData)(data);
    const product = await products_1.default.findByIdAndUpdate(id, { ...data });
    return product;
};
exports.updateProduct = updateProduct;
/**
 * delete product
 * @param id product id
 * @returns true if product is deleted
 * @throws error if product is not deleted
 */
const deleteProduct = async (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw http_errors_1.default.NotFound('No product with this id found');
    }
    if (await products_1.default.findByIdAndDelete(id))
        return true;
};
exports.deleteProduct = deleteProduct;
exports.default = {
    addProduct: exports.addProduct,
    getProducts: exports.getProducts,
    findProductById: exports.findProductById,
    updateProduct: exports.updateProduct,
    deleteProduct: exports.deleteProduct
};
