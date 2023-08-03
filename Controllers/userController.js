const url = require("url")
const UserModel = require("./../Models/User")

const getAll = async (req,res)=>{
    const users = await UserModel.find()

    res.writeHead(200,{"Content-Type" : "application/json"})
    res.write(JSON.stringify(users))
    res.end()
}

const creatNewUser = async (req,res)=>{
    let reqBody = ''
    req.on("data",(data)=>{
        reqBody += data.toString()
    })
    req.on("end",async ()=>{
        const newUserInfo = JSON.parse(reqBody)
        const {name , username , email} = newUserInfo
        if(name === "",username === "", email === ""){
            res.writeHead(422,{"Content-Type":"application/json"})
            res.write(JSON.stringify({message:"the req was uncomplited"}))
            res.end()
        }else{
            const postingNewUserResult = await UserModel.addNewUser(newUserInfo)
            res.writeHead(201,{"Content-Type":"application/json"})
            res.write(JSON.stringify(postingNewUserResult))
            res.end()
            
        }
    })
}

const upgradeUser = async (req,res)=>{
    const userId = url.parse(req.url,true).query.id
    const updateRes = await UserModel.upgradeUserRole(userId)
    res.writeHead(200,{"Content-Type":"application/json"})
    res.write(JSON.stringify(updateRes))
    res.end()
}

const setCrime = async (req,res)=>{
    const userId = url.parse(req.url,true).query.id
    let reqBody = ''
    req.on('data',(data)=>{
        reqBody += data.toString()
    })
    req.on('end',async()=>{
        const {crime} = JSON.parse(reqBody)
        const setUserCrimeRes = await UserModel.serUserCrime(userId,crime)
        res.writeHead(200 , {"Content-Type":"application/json"})
        res.write(JSON.stringify(setUserCrimeRes))
        res.end()
    })
}

module.exports ={
    getAll,
    creatNewUser,
    upgradeUser,
    setCrime,
}