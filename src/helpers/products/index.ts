import { v4 } from 'uuid'
import utils from '../utils'
import createError from 'http-errors'
import { product, Query } from '../../services/types'
import { validateData } from './validate-products'

/**
 * add product to the database
 * @param data product data to be added
 * @returns products
 */
export const addProduct = async (data: product) => {
    await validateData(data);

    const products = await utils.read();
    const newProduct = { id: v4(), ...data };
    products.push(newProduct);
    await utils.write(products)
    return products;
}

/**
 * find product by id
 * @param id product id
 * @returns prouduct found by id
 */
export const findProductById = async (id: string) => {
    const products = await utils.read();
    const product = products.find((product: any) => product.id === id);
    return product;
}

/**
 * getting products and paging, limiting, sorting and filtering
 * @param query query parameters
 * @returns the list of products
 */
export const getProducts = async (query: Query) => {
    const  { sort, name, company, } = query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    let products = await utils.read();
    if(page && limit){
        const start = (page - 1) * limit;
        const end = page * limit;
        products = products.slice(start, end)
    }
    if(sort){
        products = await utils.sortProducts(products, sort);
    }
    if(name || company){
        products = await utils.filterProducts(products, name, company);
    }
    return products;
}

/**
 * update product
 * @param id product id
 * @param data product data to be updated
 * @returns updated product
 * @throws error if product is not updated
 */
export const updateProduct = async (id: any, data: product) => {
    await validateData(data)

    const products = await utils.read();
    const product = products.findIndex((product: any) => product.id === id);
    if(product === -1){
        throw createError.NotFound('No product with this id found');
    }
    products[product] = { id, ...data };
    await utils.write(products);
    return findProductById(id);
}

/**
 * delete product
 * @param id product id
 * @returns true if product is deleted
 * @throws error if product is not deleted
 */
export const deleteProduct = async (id: string) => {
    const products = await utils.read();
    const product = products.findIndex((product: any) => product.id === id);
    if(product === -1){
        throw createError.NotFound('No product with this id found');
    }
    products.splice(product, 1);
    await utils.write(products);
    return true;
}
export default {
    addProduct,
    getProducts,
    findProductById,
    updateProduct,
    deleteProduct
};