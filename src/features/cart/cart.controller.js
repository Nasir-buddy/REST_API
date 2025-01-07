import cartModel from "./cart.model.js";
export class cartController{
    add(req, res){
        const { productID, quantity } = req.query;
        const userID = req.userID;
        cartModel.add(productID, userID, quantity);
        res.status(201).send("cart is updated.");
    }
    get(req, res){
        const userID = req.userID;
        const items = cartModel.get(userID);
        return res.status(200).send(items);
    }

    delete(req, res){
        const useID = req.useID;
        const cartItemID = req.paramd.id;
        const error = cartModel.delete(cartItemID, useID);

        if(error){
            return res.status(404).send(error)
        } 
        return res.status(200).send("cart item deleted successfully.")
    }
 }