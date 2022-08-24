const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({

    title : String,
    image : {type : String, default : null},
    icon : {type : String, default : null},
    description : {type : String, default : null},

}, { timestamps : true })

module.exports = mongoose.model("categories", categorySchema)