import express, { Router } from 'express';
import { cartController } from './cart.controller.js';
import { upload } from '../../middleware/fileupload.middleware.js';

// 2. Initialize Express router.
const cartRouter = express.Router();
const CartController = new cartController();

cartRouter.delete('/:id', CartController.delete);
cartRouter.post('/', CartController.add);
cartRouter.get('/', CartController.get);
export default cartRouter;