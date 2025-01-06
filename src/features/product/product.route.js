// Manage routes/paths to product controller

// 1. Import express
import express from 'express';
import ProductController from './prodcut.controllers.js';
import { upload } from '../../middleware/fileupload.middleware.js';

// 2. Initialize Express router.
const ProductRouter = express.Router();
const productController = new ProductController();

ProductRouter.post('/rate', productController.rateProduct);
ProductRouter.get('/filter', productController.filterProduct);
ProductRouter.get('/', productController.getAllProducts)
ProductRouter.post('/', upload.single('imageUrl'), productController.addProduct);
ProductRouter.get('/:id', productController.getOneProduct);

export default ProductRouter;