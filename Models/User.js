// const db = require("./../db.json")
const { ObjectId } = require("mongodb")
const { dbConnection } = require("./../configs/db")
const find = async ()=>{
    const db = await dbConnection()
    const usersCollection = db.collection("users")
    const users = await usersCollection.find({}).toArray()
    return users
}

const addNewUser =async (newUserInfo)=>{
    const {name , username , email} = newUserInfo
    const db = await dbConnection()
    const usersCollection = db.collection('users')
    const addRes = await usersCollection.insertOne({
        name : name,
        username : username,
        email : email,
        crime : 0,
        role : "USER"
    })
    if(addRes.acknowledged){
        return {message: "new user added succesfully"}
    }else{
        return {message: "adding user has failled..."}
    }
}

const upgradeUserRole =async (userId)=>{
    const db = await dbConnection()
    const usersCollection = db.collection('users')
    const updateUserRes = await usersCollection.updateOne({_id : new ObjectId(userId)},
    {
        $set:{
            role : "ADMIN"
        }
    })
    if(updateUserRes.matchedCount){
        return {message : "user has been upgrated as ADMIN "}
    }else{
        return {message : "upgrade failed"}
    }

}

const serUserCrime = async(userId,crime)=>{
    const db = await dbConnection()
    const usersCollection = db.collection('users')
    const updateUserCrimeRes = await usersCollection.updateOne({_id : new ObjectId(userId)},
    {
        $set:{
            crime : crime
        }
    })
    if(updateUserCrimeRes.matchedCount){
        return {message : "user crimeSet has sucsesfully complited..."}
    }else{
        return {message : "seting crime failed"}
    }
}

module.exports = {
    find,
    addNewUser,
    upgradeUserRole,
    serUserCrime,
}