export default class cartModel {
    constructor(productID, userID, quantity, id) {
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
        this.id = id;
    }

    static add(productID, userID, quantity) {
        const cartItem = new cartModel(
            productID,
            userID,
            quantity
        );
        cartItem.id = cartItems.length + 1;
        cartItems.push("cart items ", cartItem);
        return cartItem;
    }
    static get(userID){
        return cartItems.filter(i => i.userID == userID)
    }
    static delete(cartItemID, userID){
        const cartItemIndex = cartItems.find((i) => i.id == cartItemID && i.userID == userID);
        if(cartItemIndex == -1){
            return "item not found";
        } else {
            cartItems.splice(cartItemIndex, 1);
        }
    }
}

var cartItems = [
    new cartModel(1, 3, 1, 1),
    new cartModel(1, 1, 2, 2)
];