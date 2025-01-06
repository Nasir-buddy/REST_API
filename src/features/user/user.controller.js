import jwt from "jsonwebtoken";
import UserModel  from "./user.model.js";
export default class UserController {
    signUp(req, res) {
        const { name, email, password, type } = req.body;
        const user = UserModel.signUp(name, email, password, type);
        res.status(201).send(user)
    }

    signIn(req, res) {
        const result = UserModel.signIn(req.body.email, req.body.password);
        if(!result){
        } else {
            return res.status(400).send({ error: "Invalid email or password."})
            // 1. create token and send token
            const token = jwt.sign({ userID: result.id, email: result.email, }, 'xlNa83elHDT5UKoBmiCKo0RahbcYmbdU', { expiresIn: '1h' });

            return res.status(200).send(token);
        }
    }
}
