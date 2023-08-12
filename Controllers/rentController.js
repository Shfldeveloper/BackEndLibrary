const url = require("url")
const rentModel = require("../Models/Rent")
const bookModel = require("../Models/Book")

const restoreBook = async (req,res)=>{
    // const bookId = url.parse(req.url,true).query.id
    const bookId = req.params.id
    const deleteRentResult = await rentModel.deleteRent(bookId)
    if(deleteRentResult){
        const freeBookRes = await bookModel.freeBook(bookId)
        res.send(freeBookRes)
        // res.writeHead(200,{"Content-Type":"application/json"})
        // res.write(JSON.stringify(freeBookRes))
        // res.end()
    }
}

module.exports = {
    restoreBook,
}