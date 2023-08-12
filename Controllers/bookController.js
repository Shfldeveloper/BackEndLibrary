const url = require("url")
const BookModel = require("./../Models/Book")

const getAll = async (req,res)=>{
    const books = await BookModel.find()
    // res.writeHead(200,{"Content-Type":"application/json"})
    // res.write(JSON.stringify(books))
    // res.end()
    res.send(books)
}

const deleteOne = async (req,res) =>{
    const parsedUrl = url.parse(req.url,true)
    const bookId = parsedUrl.query.id
    const resMessage = await BookModel.remove(bookId)
    res.writeHead(200,{"Content-Type":"application/json"})
    res.write(JSON.stringify(resMessage))
    res.end()
}
const postBook = async (req,res) =>{
    let book = ''
    req.on("data",(data)=>{
        book += data.toString()
    })
    req.on("end", async ()=>{
        const newBook = {
            ...JSON.parse(book),
            free : 1
        }
        const postingBookResult =await BookModel.addBook(newBook)
        res.writeHead(201,{"Content-Type":"application/json"})
        res.write(JSON.stringify(postingBookResult))
        res.end()
    })
}
const updateBook = async (req,res)=>{
    const booId = url.parse(req.url,true).query.id
    let reqBody = ''
    req.on("data",(data)=>{
        reqBody += data.toString()
    })
    req.on("end", async ()=>{
        const bookNewInfo = JSON.parse(reqBody)
        const updateBookRes = await BookModel.updateOneBook(booId,bookNewInfo)
        res.writeHead(200,{"Content-Type":"application/json"})
        res.write(JSON.stringify(updateBookRes))
        res.end()
    })

}

module.exports = {
    getAll,
    deleteOne,
    postBook,
    updateBook,
}