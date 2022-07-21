const productModel = require("../../models/product")

module.exports.addProduct = async (req, res) => {
    try{

        const {title, sku, price, image} = req.body;

        if(!title || !sku || !price) return res.send("Fields are empty")

        let product = new productModel(req.body)
        product.save()

        return res.json({
            success : true,
            message : "Product inserted successfully",
            data : product
        })

    }catch(error){
        return res.send(error.message)
    }
}

module.exports.getProducts = async (req, res) => {
    try{

        // pagination

        // var {page, skip} = req.query;
        // if(!page) page = 1
        // if(!skip) skip = 0

        const products = await productModel.find();
        const productsCount = await productModel.find().count();

        return res.json({
            success : true,
            status : 400,
            message : "list of all products",
            products,
            count : productsCount
        })

    }catch(error){
        return res.send(error.message)
    }
}

