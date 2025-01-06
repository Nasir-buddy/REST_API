import cardModel from "./cart.model.js";
export class cartController{
    add(req, res){
        const { productID, quantity } = req.body;
        const userID = req.userID;
        cardModel.add(productID, userID, quantity);
        res.status(201).send("cart is updated.");
    }

 }