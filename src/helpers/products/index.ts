import { Types } from 'mongoose'
import utils from '../utils'
import createError from 'http-errors'
import { product, Query } from '../../services/types'
import { validateData } from './validate-products'
import products from '../../models/products'

/**
 * add product to the database
 * @param data product data to be added
 * @returns products
 */
export const addProduct = async (data: product) => {
    await validateData(data);

    const product= await products.create( { ...data } );

    return product;
}

/**
 * find product by id
 * @param id product id
 * @returns prouduct found by id
 */
export const findProductById = async (id: string) => {
    if(!Types.ObjectId.isValid(id)){
        throw createError.BadRequest('Invalid product id');
    }
    const product = await products.findById(id);
    return product;
}

/**
 * getting products and paging, limiting, sorting and filtering
 * @param query query parameters
 * @returns the list of products
 */
export const getProducts = async (query: Query) => {
    const { page, limit, sort, name, company } = query;

    const queyObject: Query = {};
    if(name) {
        queyObject.name = { $regex: name as string, $options: 'i' };
    }
    if(company){
        queyObject.company = company;
    }
    let result = products.find(queyObject);
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else{
        result = result.sort('createdAt');
    }

    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;
    result = result.skip(skip).limit(limits);
    const product = await result;
    return product;
}

/**
 * update product
 * @param id product id
 * @param data product data to be updated
 * @returns updated product
 * @throws error if product is not updated
 */
export const updateProduct = async (id: any, data: product) => {
    if(!Types.ObjectId.isValid(id)){
        throw createError.NotFound('No product with this id found');
    }
    await validateData(data)
    const product = await products.findByIdAndUpdate(id, { ...data  });
    return product;
}

/**
 * delete product
 * @param id product id
 * @returns true if product is deleted
 * @throws error if product is not deleted
 */
export const deleteProduct = async (id: string) => {
    if(!Types.ObjectId.isValid(id)){
        throw createError.NotFound('No product with this id found');
    }
    if(await products.findByIdAndDelete(id))
        return true;
}
export default {
    addProduct,
    getProducts,
    findProductById,
    updateProduct,
    deleteProduct
};