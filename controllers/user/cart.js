const orderModel = require("../../models/order")
const userModel = require("../../models/user")
const productModel = require("../../models/product")
const {ObjectId} = require('mongodb');

module.exports.checkout = async (req, res) => {
    try{
        
        var body = req.body;
        const user = req.user

        body.user = user?._id
        body.orderId = (Math.floor(Math.random() * 1000000000)).toString();

        // if cart is not empty and items array contains objects
        if(body?.items.length){
            let checkout = new orderModel(body)
            checkout.save()

            let items = body?.items 

            items.forEach(async item => {

                const updatedQuantity = await productModel.findOneAndUpdate(
                    { _id: item.productId },
                    [{
                        $set: {
                            quantity: {
                                $subtract: ["$quantity", item.quantity]
                            },
                        }
                    }],
                )
            });
            return res.json({
                success: true,
                message : "successful checkout",
                data : checkout
            })
        }
        else{
            return res.json({
                success: false,
                message : "pass correct parameters"
            })
        }

    }catch(error){
        return res.send(error.message)
    }
}

module.exports.addToCart = async (req, res) => {
    try{

        const data = req.body
        let user = req.user

        const addToCart = await userModel.findOneAndUpdate({_id : user?._id}, { $push: { cart: data } },{new : true})

        return res.json({
            success : true,
            message : "product pushed in cart successfully",
            data : addToCart
        })

    }catch(error){
        return res.send(error.message)
    }
}

module.exports.removeFromCart = async (req, res) => {
    try{

        const id = req.query
        let user = req.user

        const removeFromCart = await userModel.findOneAndUpdate({_id : user?._id}, { $pull: { cart: {productId : ObjectId(id)} } },{new : true})

        return res.json({
            success : true,
            message : "product removed from cart successfully",
            data : removeFromCart
        })

    }catch(error){
        return res.send(error.message)
    }
}

module.exports.cart = async (req, res) => {
    try{

        const user = req.user

        const cart = await userModel.find({_id : user._id})
            .populate("cart.productId")
            .select("-password -userType")

        return res.json({
            success : true,
            message : "cart",
            data : cart
        })

    }catch(error){
        return res.send(error.message)
    }
}