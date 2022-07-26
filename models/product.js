const mongoose = require("mongoose")

const productSchema = mongoose.Schema({

    title : String,
    sku : {type : String},
    price : Number,
    image : String,
    quantity : Number

}, { timestamps : true })

module.exports = mongoose.model("product", productSchema)