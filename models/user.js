const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// const { TOKEN_KEY } = process.env

const userSchema = mongoose.Schema({
    name : String,
    email : {type : String, required : true, unique : true},
    password : String,

},{timestamps: true})


// userSchema.methods.generateAuthToken = function () {
//     this.token = jwt.sign({ userID: this._id, email: this.email }, TOKEN_KEY, { expiresIn: '10h' })
// }

module.exports = mongoose.model('user',userSchema)