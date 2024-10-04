import Ajv from 'ajv';
import createError from 'http-errors';
import { product } from '../../services/types';

/**
 * validate data from the request body
 * @param data data to validate
 * @returns true
 * @throws error if data is invalid
 */
export const validateData = async (data: product ) => {

    const ajv = new Ajv();

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

    if(!isValid) 
        throw createError.BadRequest('Invalid input data or misisng fields');

    return true;
}
