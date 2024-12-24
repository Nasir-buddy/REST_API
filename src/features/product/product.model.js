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
    (!maxPrice || product.price <= maxPrice ) && 
    (!category || product.category == category))
  };
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
