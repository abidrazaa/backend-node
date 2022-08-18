const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({

    title : String,
    image : String,
    icon : String,
    description : String,

}, { timestamps : true })

module.exports = mongoose.model("categories", categorySchema)