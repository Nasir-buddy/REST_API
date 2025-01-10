import express from 'express'
import swagger from 'swagger-ui-express';
import cors from 'cors';

import ProductRouter from './src/features/product/product.route.js';
import UserRouter from './src/features/user/user.routes.js';

import bodyParser from 'body-parser';
import basicAuth from './src/middleware/basicAuth.middleware.js';
import jwtAuth from './src/middleware/jwt.middleware.js';
import cartRouter from './src/features/cart/cart.route.js';
import apiDocs from './swagger.json' assert {type: 'json'};

const port = 3000;
const server = express();

// CORS policy header origin
// server.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');
     
//     if(req.method == "OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
// })
var corsOptions = {
    origin: 'http://127.0.0.1:5500',
    allowedHeaders: '*',

}
server.use(cors(corsOptions));

// all json format data should be readable for browser
server.use(bodyParser.json());
// for all request related to product redirect to product routes.

server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));

server.use('/api/products', jwtAuth, ProductRouter);
server.use('/api/cartItems', jwtAuth, cartRouter);
server.use('/api/users', UserRouter);

server.get('/', (req, res) => {
    res.send('welcome to e-comm app.');
});

// if none of these routes are matched. for handling 404 error
server.use((req, res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3000/api-docs");
})


server.listen(port, () => {
    console.log("server is running on port 3000");
});