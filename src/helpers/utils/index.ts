import fs from 'fs';
import path from 'path';
import { product } from '../../services/types';
import createError from 'http-errors';

const file = path.join(__dirname, '../../models/data.json')

/**
 * write data to the file data.json
 * @param data data to be written
 * @returns true if data is written
 * @throws error if data is not written
 */
export const write = async (data: product[]) => {
    try {
        fs.writeFileSync(
            file,
            JSON.stringify(data),
            'utf-8'
        );
        return true;
    } catch (error) {
        throw createError.InternalServerError('Unable to save file');
    }
}

/**
 * read data from the file data.json
 * @returns read data
 * @throws error if data is not read
 */
export const read = async () => {
    try {
        const data = fs.readFileSync(
            file,
            'utf-8'
        );
        return JSON.parse(data);
    } catch (error) {
        throw createError.InternalServerError('Unable to retrive file');
    }
}

/**
 * filter products based on name and company
 * @param products products to be filtered
 * @param name name of the product
 * @param comapny company of the product
 * @returns products
 */
export const filterProducts = async (products: product[], name?: string, comapny?:string) => {
    if(name && comapny){
       return products.filter((product) => 
            product.name.toLowerCase().trim() === name.toLowerCase().trim() && 
            product.company.toLowerCase().trim() === comapny.toLowerCase().trim() 
        );
    }else if (name){
        return products.filter((product) => 
            product.name.toLowerCase().trim() === name.toLowerCase().trim());
    } else if(comapny){
        return products.filter((product) => 
            product.company.toLowerCase().trim() === comapny.toLowerCase().trim()); 
    }
}

/**
 * sort products based on sort
 * @param products products to be sorted
 * @param sort sort type
 * @returns products
 */
export const sortProducts = async (products: product[], sort: string) => {
    if(sort === 'name'){
        products.sort((a:any, b:any) => a.name.localeCompare(b.name));
    }else if(sort === 'company'){
        products.sort((a:any, b:any) => a.company.localeCompare(b.company));
    }else if(sort === 'price'){
        products.sort((a:any, b:any) => a.price - b.price);  

    }else if(sort === 'rating'){
        products.sort((a:any, b:any) => a.rating - b.rating);  
    }
    else if(sort === '-price'){
        products.sort((a:any, b:any) => b.price - a.price);
    }
    else{
        products.sort((a:any, b:any) => a.name.localeCompare(b.name));
    }
    return products;
}

export default {
    write,
    read,
    filterProducts,
    sortProducts
}