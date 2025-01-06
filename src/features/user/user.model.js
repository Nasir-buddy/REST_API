export default class UserModel {
    constructor(name, email, password, type, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = id;
    }

    static signUp(name, email, password, type){
        const newUser = new UserModel(name, email, password, type);
        newUser.id = users.length + 1;
        users.push(newUser);
        console.log("newUser", newUser);
        
        return newUser;
    }

    static signIn(email, password){
        return users.find(user => user.email === email && user.password === password);
    }

    static getAllUser(){
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