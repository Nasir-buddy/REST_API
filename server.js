import express from 'express'
import ProductRouter from './src/features/product/product.route.js';
import UserRouter from './src/features/user/user.routes.js';

import bodyParser from 'body-parser';
const port = 3000;
const server = express();

// all json format data should be readable for browser
server.use(bodyParser.json());
// for all request related to product redirect to product routes.

server.use('/api/products', ProductRouter);
server.use('/api/users', UserRouter);

server.get('/', (req, res)=>{
    res.send('welcome to e-comm app.');
});

server.listen(port, ()=>{
    console.log("server is running on port 3000");
});