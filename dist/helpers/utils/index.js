"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortProducts = exports.filterProducts = exports.read = exports.write = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const http_errors_1 = __importDefault(require("http-errors"));
const file = path_1.default.join(__dirname, '../../models/data.json');
/**
 * write data to the file data.json
 * @param data data to be written
 * @returns true if data is written
 * @throws error if data is not written
 */
const write = async (data) => {
    try {
        fs_1.default.writeFileSync(file, JSON.stringify(data), 'utf-8');
        return true;
    }
    catch (error) {
        throw http_errors_1.default.InternalServerError('Unable to save file');
    }
};
exports.write = write;
/**
 * read data from the file data.json
 * @returns read data
 * @throws error if data is not read
 */
const read = async () => {
    try {
        const data = fs_1.default.readFileSync(file, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        throw http_errors_1.default.InternalServerError('Unable to retrive file');
    }
};
exports.read = read;
/**
 * filter products based on name and company
 * @param products products to be filtered
 * @param name name of the product
 * @param comapny company of the product
 * @returns products
 */
const filterProducts = async (products, name, comapny) => {
    if (name && comapny) {
        return products.filter((product) => product.name.toLowerCase().trim() === name.toLowerCase().trim() &&
            product.company.toLowerCase().trim() === comapny.toLowerCase().trim());
    }
    else if (name) {
        return products.filter((product) => product.name.toLowerCase().trim() === name.toLowerCase().trim());
    }
    else if (comapny) {
        return products.filter((product) => product.company.toLowerCase().trim() === comapny.toLowerCase().trim());
    }
};
exports.filterProducts = filterProducts;
/**
 * sort products based on sort
 * @param products products to be sorted
 * @param sort sort type
 * @returns products
 */
const sortProducts = async (products, sort) => {
    if (sort === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (sort === 'company') {
        products.sort((a, b) => a.company.localeCompare(b.company));
    }
    else if (sort === 'price') {
        products.sort((a, b) => a.price - b.price);
    }
    else if (sort === 'rating') {
        products.sort((a, b) => a.rating - b.rating);
    }
    else if (sort === '-price') {
        products.sort((a, b) => b.price - a.price);
    }
    else {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }
    return products;
};
exports.sortProducts = sortProducts;
exports.default = {
    write: exports.write,
    read: exports.read,
    filterProducts: exports.filterProducts,
    sortProducts: exports.sortProducts
};
