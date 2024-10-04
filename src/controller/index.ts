import { Request, Response } from 'express';
import createError from 'http-errors';
import helper from '../helpers/products';


/**
 * controller to post products
 * @param req request object
 * @param res response object
 * @returns product
 * @throws error if product is not posted
 */
export const postProducts = async (req: Request, res: Response) => {
    const product = await helper.addProduct( { ...req.body });
    if(product.lentgh === 0){
        throw new createError.BadRequest('Unable to post product');
    }    
    return res.status(201).json({ 'updated': product });
}

/**
 * controller to get all products
 * @param req Request object
 * @param res Response object
 * @returns list of products
 * @throws error if no products found
 */
export const getAllProducts = async (req: Request, res: Response) => {
    const products = await helper.getProducts({ ...req.query });
    if(products.length === 0){
        throw new createError.NotFound('No products found');
    }
    return  res.status(200).json({ 'products': products });
}

/**
 * constroller to get a single product
 * @param req Request object
 * @param res Response object
 * @returns a single product
 */
export const getSingleProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id){
        throw new createError.BadRequest('Invalid product id');
    }
    const product = await helper.findProductById(id);
    return res.status(200).json({ 'product': product });
}

/**
 * controller to update a product
 * @param req Request object
 * @param res Response object
 * @returns updated product
 */
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const update = await helper.updateProduct(id , { ...req.body });
    res.status(200).json({ 'message': update });
}

/**
 * constroller to delete a product
 * @param req Request object
 * @param res Response object
 * @returns deleted message
 */
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(await helper.deleteProduct(id)){
        res.status(200).json({ 'message': 'Product deleted' });
    }
}


export default {
    getAllProducts,
    postProducts,
    updateProduct,
    getSingleProduct,
    deleteProduct
}