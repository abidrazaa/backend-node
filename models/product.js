const mongoose = require("mongoose")

const productSchema = mongoose.Schema({

    title : String,
    sku : {type : String},
    price : Number,
    image : String,
    description : String,
    category : {type:mongoose.Schema.Types.ObjectId, ref:'categories'},
    quantity : Number

}, { timestamps : true })

module.exports = mongoose.model("product", productSchema)