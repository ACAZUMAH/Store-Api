"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.findProductById = exports.addProduct = void 0;
const uuid_1 = require("uuid");
const utils_1 = __importDefault(require("../utils"));
const http_errors_1 = __importDefault(require("http-errors"));
const validate_products_1 = require("./validate-products");
/**
 * add product to the database
 * @param data product data to be added
 * @returns products
 */
const addProduct = async (data) => {
    await (0, validate_products_1.validateData)(data);
    const products = await utils_1.default.read();
    const newProduct = { id: (0, uuid_1.v4)(), ...data };
    products.push(newProduct);
    await utils_1.default.write(products);
    return products;
};
exports.addProduct = addProduct;
/**
 * find product by id
 * @param id product id
 * @returns prouduct found by id
 */
const findProductById = async (id) => {
    const products = await utils_1.default.read();
    const product = products.find((product) => product.id === id);
    return product;
};
exports.findProductById = findProductById;
/**
 * getting products and paging, limiting, sorting and filtering
 * @param query query parameters
 * @returns the list of products
 */
const getProducts = async (query) => {
    const { sort, name, company, } = query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    let products = await utils_1.default.read();
    if (page && limit) {
        const start = (page - 1) * limit;
        const end = page * limit;
        products = products.slice(start, end);
    }
    if (sort) {
        products = await utils_1.default.sortProducts(products, sort);
    }
    if (name || company) {
        products = await utils_1.default.filterProducts(products, name, company);
    }
    return products;
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
    await (0, validate_products_1.validateData)(data);
    const products = await utils_1.default.read();
    const product = products.findIndex((product) => product.id === id);
    if (product === -1) {
        throw http_errors_1.default.NotFound('No product with this id found');
    }
    products[product] = { id, ...data };
    await utils_1.default.write(products);
    return (0, exports.findProductById)(id);
};
exports.updateProduct = updateProduct;
/**
 * delete product
 * @param id product id
 * @returns true if product is deleted
 * @throws error if product is not deleted
 */
const deleteProduct = async (id) => {
    const products = await utils_1.default.read();
    const product = products.findIndex((product) => product.id === id);
    if (product === -1) {
        throw http_errors_1.default.NotFound('No product with this id found');
    }
    products.splice(product, 1);
    await utils_1.default.write(products);
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
