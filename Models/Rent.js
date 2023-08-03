const { ObjectId } = require("mongodb")
const { dbConnection } = require("./../configs/db")

const deleteRent = async (bookId)=>{
    const db = await dbConnection()
    const rentsCollection = db.collection("rents")
    const deleteRentRes = await rentsCollection.deleteOne({
        bookID : new ObjectId(bookId)
    })
    if(deleteRentRes.deletedCount){
        return true
    }else{
        return false
    }
}





module.exports = {
    deleteRent,
}