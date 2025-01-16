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
import loggerMiddleware from './src/middleware/logger.middleware.js';
import { ApplicationError } from './src/error-handler/ApplicationError.js';
import { connectMDB } from './src/database/db.js';

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

server.use(loggerMiddleware)
server.use('/api/products', jwtAuth, ProductRouter);
server.use('/api/cartItems', loggerMiddleware, jwtAuth, cartRouter);
server.use('/api/users', UserRouter);

server.get('/', (req, res) => {
    res.send('welcome to e-comm app.');
});


// error handler middleware
server.use((err, req, res, next) => {
    console.log(err);
    console.log("running error app");

    if (error instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
    // server error
    res.status(500).send('something went wrong, please try later')
})
// if none of these routes are matched. for handling 404 error
server.use((req, res) => {
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3000/api-docs");
})


server.listen(port, () => {
    console.log("server is running on port 3000");
    connectMDB();
});