// const db = require("./../db.json")
// const fs = require("fs")
const { ObjectId } = require("mongodb")
const { dbConnection } = require("./../configs/db")
const find = async ()=>{
    const db = await dbConnection()
    const booksCollection = db.collection("books")
    const books =  await booksCollection.find({}).toArray()
    return books;
}

const remove = async (bookId)=>{
    const db = await dbConnection()
    const booksCollection = db.collection("books")
    const deleteResult = await booksCollection.deleteOne({
        _id : new ObjectId(bookId)
    })
    if(deleteResult.deletedCount){
        return {message : "book has removed successfully"}
    }else{
        return {message : "out of index"}
    }
}
const addBook = async (book)=>{
    const db = await dbConnection()
    const booksCollection = db.collection("books")
    const pushResult = await booksCollection.insertOne(book)
    if(pushResult.acknowledged){
        return {message: "new book added succesfully"}
    }else{
        return {message: "adding book has failled..."}
    }
}

const freeBook = async(bookId)=>{
    const db = await dbConnection()
    const booksCollection = db.collection("books")
    const freeBookRes = await booksCollection.updateOne({
        _id : new ObjectId(bookId)
    },{
        $set: {
            free : 1
        }
    })
    if(freeBookRes.matchedCount){
        return {message : "book has returned Sucsessfully"}
    }else{
        return {message : "something went wrong . :(("}
    }
}

const updateOneBook = async (bookId,bookNewInfo)=>{
    const db = await dbConnection()
    const booksCollection = db.collection("books")
    const updateBookRes = await booksCollection.updateOne({
        _id : new ObjectId(bookId)
    },{
        $set:{
            title : bookNewInfo.title,
            author : bookNewInfo.author,
            price: bookNewInfo.price
        }
    })
    if(updateBookRes.matchedCount){
        return {messsage : "book has updated succesfully" }
    }else{
        return {message : "book update has FAILEED :(( "}
    }
}

module.exports = {
    find,
    remove,
    addBook,
    freeBook,
    updateOneBook,
}