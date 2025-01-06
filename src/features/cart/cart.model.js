export default class cardModel {
    constructor(productID, userID, quantity, id) {
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
        this.id = id;
    }

    static add(productID, userID, quantity) {
        const cartItem = new cardModel(
            productID,
            userID,
            quantity
        );
        cartItem.id = cartItems.length + 1;
        cartItems.push(cartItem);
        return cartItem;
    }
}

var cartItems = [new cardModel(1, 3, 1, 1)];