import { getDB } from "../../database/db.js";

export default class UserModel {
    constructor(name, email, password, type, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }

    static async signUp(name, email, password, type) {
        try {
            // get the database
            const db = getDB();
            // get the collection 
            const conllection = db.collection('users')
            const newUser = new UserModel(name, email, password, type);
            // insert the document
            // insert one is use to insert one document.
            await conllection.insertOne(newUser);
            // console.log("newUser", newUser);
            return newUser;
        } catch (error) {
            console.log(error, "error while creating the users");
        }

    }

    static signIn(email, password) {
        return users.find(user => user.email === email && user.password === password);
    }

    static getAllUser() {
        return users;
    }
}

let users = [{
    id: 1,
    name: "Admin User",
    email: "admin@ecom.com",
    password: "admin",
    type: "seller"
},
{
    id: 2,
    name: "Customer User",
    email: "customer@ecom.com",
    password: "customer",
    type: "customer"
}
]