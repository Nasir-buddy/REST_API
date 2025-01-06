import express, { Router } from 'express';
import { cartController } from './cart.controller.js';
import { upload } from '../../middleware/fileupload.middleware.js';

// 2. Initialize Express router.
const cartRouter = express.Router();
const CartController = new cartController();

cartRouter.post('/', CartController.add);

export default cartRouter;