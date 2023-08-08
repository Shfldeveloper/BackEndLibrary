const http = require("http")
const fs = require("fs")
const url = require("url")
const db = require("./db.json")
const crypto = require("crypto")
const bookController = require("./Controllers/bookController")
const userController = require("./Controllers/userController")
const rentController = require("./Controllers/rentController")
require("dotenv").config()


// const server = http.createServer((req,res)=>{
//     if(req.method === "GET" && req.url === "/api/users"){
//         userController.getAll(req,res)
//     }else if(req.method === "GET" && req.url === "/api/books"){
//         bookController.getAll(req,res)
//     }else if(req.method === "DELETE" && url.parse(req.url).pathname === "/api/books"){
//         bookController.deleteOne(req,res)
//     }else if(req.method === "POST" && req.url === "/api/books"){
//         bookController.postBook(req,res)
//     }else if(req.method ==="PUT" && req.url.startsWith("/api/books/back")){
//         rentController.restoreBook(req,res)
//     }else if(req.method === "PUT" && req.url.startsWith("/api/books")){
//         bookController.updateBook(req,res)
//     }else if(req.method === "POST" && req.url === "/api/users"){
//         userController.creatNewUser(req,res)
        
//         // let newUserInfo = ''
//         // req.on("data",(data)=>{
//         //     newUserInfo += data.toString()
//         // })
//         // req.on("end",()=>{
//         //     const {name , username , email} = JSON.parse(newUserInfo)
//         //     const isUsernameExist = db.users.find(user => user.username === username)
//         //     const isEmailExist = db.users.find(user => user.email === email)
            
//             // if(name === "",username === "", email === ""){
//             //     res.writeHead(422,{"Content-Type":"application/json"})
//             //     res.write(JSON.stringify({message:"the req was uncomplited"}))
//             //     res.end()
//             // }else if(isUsernameExist){
//             //     res.writeHead(409,{"Content-Type":"application/json"})
//             //     res.write(JSON.stringify({message: "Username is already token"}))
//             //     res.end()
//             // }else if(isEmailExist){
//             //     res.writeHead(409,{"Content-Type":"application/json"})
//             //     res.write(JSON.stringify({message:"this email has already logined"}))
//             //     res.end()
//             // }else{
//             // const newUser = {
//             //     id : crypto.randomUUID(),
//             //     name,
//             //     username,
//             //     email,
//             //     crime : 0,
//             //     role : "USER"
//             // }
//             // db.users.push(newUser)
//             // fs.writeFile("db.json",JSON.stringify(db),(err)=>{
//             //     if(err){
//             //         throw err
//             //     }
//             //     res.writeHead(201,{"Content-Type":"application/json"})
//             //     res.write(JSON.stringify({message : "new user added sucsesfuly"}))
//             //     res.end()
//             // })}

//         // })

        
//     }else if(req.method === "PUT" && req.url.startsWith("/api/users/upgrade")){
//         userController.upgradeUser(req,res)
//     }else if(req.method === "PUT" && req.url.startsWith("/api/users")){
//         userController.setCrime(req,res)
//     }else if(req.method === "POST" && req.url === "/api/users/login"){
//         let reqBody = ""
//         req.on("data",(data)=>{
//             reqBody += data.toString()
//         })
//         req.on("end",()=>{
//             const {username , email} = JSON.parse(reqBody)
//             const user = db.users.find((user)=> user.username === username && user.email === email)
//             if(user){
//                 res.writeHead(200,{"Content-Type":"application/json"})
//                 res.write(JSON.stringify({message:"you have loged in sucsesfully"}))
//                 res.end()
//             }else{
//                 res.writeHead(401,{"Content-Type":"application/json"})
//                 res.write(JSON.stringify({message:"something went wrong please try again // login ERROR"}))
//                 res.end()
//             }
//         })
//     }else if(req.method === "POST" && req.url === "/api/books/rent"){
//         let reqBody = ''
//         req.on("data",(data)=>{
//             reqBody += data.toString()
//         })
//         req.on("end",()=>{
//             let {userID , bookID } = JSON.parse(reqBody)
//             let isBookAvelaible = db.books.some((book)=> book.id === Number(bookID) && book.free === 1)
//             if(isBookAvelaible){
//                 db.books.forEach((book)=>{
//                     if(book.id === Number(bookID)){
//                         book.free = 0
//                     }
//                 })
//                 const newRent = {
//                     id : crypto.randomUUID(),
//                     userID,
//                     bookID
//                 }
//                 db.rents.push(newRent)
//                 fs.writeFile("db.json",JSON.stringify(db),(err)=>{
//                     if(err){
//                         throw err
//                     }
//                     res.writeHead(201,{"Content-Type":"application/json"})
//                     res.write(JSON.stringify({message:"book rented sucsecfully"}))
//                     res.end()
//                 })
//             }else{
//                 res.writeHead(401,{"Content-Type":"application/json"})
//                 res.write(JSON.stringify({message:"book is not avalaible"}))
//                 res.end()
//             }
//         })
//     }


// })
// server.listen(process.env.PORT,()=>{
//     console.log(`sever is running on port ${process.env.PORT}`);
// })


const express = require("express")

const app = express()  //server

app.listen(process.env.PORT,()=>{
    console.log(`running on port ${process.env.PORT}`);
})