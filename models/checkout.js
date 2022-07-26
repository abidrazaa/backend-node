const mongoose = require("mongoose")

const checkoutSchema = mongoose.Schema({

    user : {type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    items : [{productId : {type: mongoose.Schema.Types.ObjectId, ref : "product"}, quantity : Number, price : Number}],
    amount : Number,
    discount : Number,
    payment_type : {type : String, enum: ["cod","online"]}

}, { timestamps : true })

module.exports = mongoose.model("checkout", checkoutSchema)