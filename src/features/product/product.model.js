import { PassThrough } from "stream";
import UserModel from "../user/user.model.js";
import { ApplicationError } from "../../error-handler/ApplicationError.js";

export default class ProductModel {

  constructor(id, name, desc, price, imageUrl, category, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
  }
  static getAll() {
    return products;
  }

  static addProduct(newProduct) {
    newProduct.id = products.length + 1;
    products.push(newProduct);
    return newProduct;
  }

  static getOne(id) {
    return products.find((i) => i.id == id);
  }
  static filterProduct(minPrice, maxPrice, category) {
    return products.filter((product) =>
      (!minPrice || product.price >= minPrice) &&
      (!maxPrice || product.price <= maxPrice) &&
      (!category || product.category == category))
  };


  static rateProducts(userID, productID, rating) {
    //1 validate user and produt.
    const user = UserModel.getAllUser().find((u) => u.id == userID);
    if (!user) {
      throw new ApplicationError("user not found", 404);
    }

    // validate for product 
    const product = products.find((p) => p.id == productID);
    if (!product) {
      throw new ApplicationError('Product not found.', 400);
    }
    // check if there are any rating and if not then add ratings array;
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({ userID: userID, rating: rating });
    } else {
      // check if user rating is aleady available.
      const existingRating = product.ratings.findIndex((r) => r.userID == userID);
      if (existingRating >= 0) {
        product.ratings[existingRating] = {
          userID: userID,
          rating: rating,
        }
      } else {
        // if not existing rating then add new rating.
        product.ratings.push({ userID: userID, rating: rating });
      }
    }
  }
}


var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 10',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    'category1',
    ['M', 'XL', 'S'],
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    'category2',
    ['M', 'XL', 'S'],
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    'category2',
    ['M', 'XL', 'S'],
  ),
];
