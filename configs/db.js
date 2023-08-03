const { MongoClient, ObjectId } = require("mongodb")

const url = "mongodb://localhost:27017/"
const dbConnection = new MongoClient(url)
const dbName = "library"


module.exports = {
    dbConnection: async ()=>{
        await dbConnection.connect()
        console.log("connected to dbConnection");
        const db = dbConnection.db(dbName)
        
        return db
    }
}