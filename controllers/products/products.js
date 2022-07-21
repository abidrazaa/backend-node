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

    }
}