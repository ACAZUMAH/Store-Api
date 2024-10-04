import { Router } from "express";
import products from "../controller";

const router = Router();

router.route('/api/products')
.post(products.postProducts)
.get(products.getAllProducts);

router.route('/api/products/:id') 
.get(products.getSingleProduct)
.put(products.updateProduct)
.delete(products.deleteProduct);

export default router; 