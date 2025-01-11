import ProductModel from "./product.model.js";

export default class ProductController {
    getAllProducts(req, res) {
        // getting product from the product model 
        const product = ProductModel.getAll();
        // sending the data by showing the status
        res.status(200).send(product);
    }

    addProduct(req, res) {
        console.log("req.body", req.body);
        console.log("req.file", req.file.filename);

        if (!req.file) {
            return res.status(400).send({ error: 'File upload is required' });
        }
        const { name, price, sizes } = req.body;
        const newProduct = {
            name,
            price: parseFloat(price),
            sizes: sizes.split(','),
            imageUrl: req.file.filename,
        };
        // sending the new product data to the product model to add the new data
        const createdRecord = ProductModel.addProduct(newProduct);
        res.status(201).send(createdRecord);
    }

    rateProduct(req, res) {
        // 1. validate user and product
        console.log(req.query);

        const userID = req.query.userID;
        const productID = req.query.productID;
        const rating = req.query.rating;

        try {
            ProductModel.rateProducts(userID, productID, rating);
        } catch (error) {
            return res.status(400).send(error.message);
        }

        return res.status(200).send('Rating has been added.')
    }

    getOneProduct(req, res) {
        console.log("running in get one product");

        const id = req.params.id;
        const product = ProductModel.getOne(id);
        if (!product) {
            res.status(404).send({ error: "Could not find the product." });
        }
        res.status(200).send(product);
    }

    filterProduct(req, res) {
        console.log("running in filter product req.query", req.query);

        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;

        const result = ProductModel.filterProduct(minPrice, maxPrice, category);
        console.log("result", result);

        res.status(200).send(result);
    };

}