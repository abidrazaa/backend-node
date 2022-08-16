const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({

    orderId : String,
    user : {type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    items : 
        [
            {
                productId : {type: mongoose.Schema.Types.ObjectId, ref : "product"}, 
                categoryId : {type: mongoose.Schema.Types.ObjectId, ref : "categories"},
                quantity : Number, 
                price : Number
            }
        ],
    amount : Number,
    discount : Number,
    shippingAddress : String,
    status : {type : String, enum : ["pending", "shipped", "delivered"]},
    country : {type : String},
    city : {type : String},
    zipcode : {type : String},
    payment_type : {type : String, enum: ["cod","online"]},
    shippedOn : {type : String},
    deliveredOn : {type : String}

}, { timestamps : true })

module.exports = mongoose.model("order", orderSchema)