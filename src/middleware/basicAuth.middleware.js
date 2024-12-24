import UserModel from "../features/user/user.model.js";

const basicAuth = (req, res, next) => {
    // 1. check if authorization header is empty.
    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(400).send("No authorization details found.");
    }
    console.log("authHeader", authHeader);
    
    // 2. if there are authorization details extract the credentials. [Basic lskdjfla;skjdflsde]
    const base64Credentials = authHeader.replace('Basic', '');
    console.log("base cred 64", base64Credentials);
    
    // 3. decode the base64 credentials to get the username and password.
    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    console.log("decodedCreds", decodedCreds);

    const creds = decodedCreds.split(':');


    const user = UserModel.getAllUser().find(u => u.email === creds[0] && u.password === creds[1]);
    if(user){
        next();
    } else {
        return res.status(401).send("Invalid credentials.");
    }

}
export default basicAuth;