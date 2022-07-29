const mogoose = require('mongoose')

const { DB_CON_STRING } = process.env

module.exports = () => {
    // mogoose.connect("mongodb://localhost/ecommerce")
    mogoose.connect("mongodb+srv://abidrazaa:Abcd1234@cluster0.lr2rk.mongodb.net/?retryWrites=true&w=majority")
        .then(() => console.log('DB Connection Successfull'))
        .catch(err => console.log(err.message))
}