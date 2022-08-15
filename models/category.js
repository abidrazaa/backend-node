const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({

    title : String,
    image : String,
    description : String,

}, { timestamps : true })

module.exports = mongoose.model("categories", categorySchema)