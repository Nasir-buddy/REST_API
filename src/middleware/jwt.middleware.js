import jwt from 'jsonwebtoken';
const jwtAuth = (req, res, next) => {
    // 1. check if authorization header is empty.
    
    const token = req.headers['authorization'];
    console.log("token", token);
    // 2. if no token , return the error.
    if(!token){
        return res.status(401).send('Unauthorized access');
    }
    // 3. check if token is valid 
    try {
        const payload = jwt.verify(token, 'xlNa83elHDT5UKoBmiCKo0RahbcYmbdU');
        req.userID = payload.userID;
        console.log(payload);
    } catch (error) {
        return res.status(401).send(error, 'Unauthorized access'); 
    }
    // 4. call next middleware 
    next();
} 

export default jwtAuth;