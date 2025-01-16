import { MongoClient } from 'mongodb';

let client;
const url = 'mongodb://localhost:27017/ecomdb';

export const connectMDB = () => {
    MongoClient.connect(url)
        .then(clientInstance => {
            client = clientInstance;
            console.log("mongodb is connected");
        })
        .catch(err => {
            console.log(err);
        })
}


export const getDB = ()=>{
    return client.db();
}
