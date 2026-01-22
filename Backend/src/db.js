const { MongoClient } = require('mongodb');
let cachedDB;

module.exports = {
    connect2db: async () => {
        if(cachedDB){
            console.log("Recover existing connection");
            return cachedDB;
        }
        try{
            console.log("Creating new connection");
            const client = await MongoClient.connect(process.env.DATABASE_URL);
            cachedDB = client.db("books");
            return cachedDB;
        } catch(err){
            console.log("Error!");
            return null;
        }
    }
}