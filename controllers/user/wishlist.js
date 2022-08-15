const userModel = require("../../models/user")
const {ObjectId} = require('mongodb');


module.exports.addToWishlist = async (req, res) => {
    try{

        const data = req.body
        let user = req.user

        const addToWishlist = await userModel.findOneAndUpdate({_id : user?._id}, { $push: { wishlist: data } },{new : true})

        return res.json({
            success : true,
            message : "product pushed in wishlist successfully",
            data : addToWishlist
        })

    }catch(error){
        return res.send(error.message)
    }
}

module.exports.removeFromWishlist = async (req, res) => {
    try{

        const id = req.query
        let user = req.user

        const removeFromWishlist = await userModel.findOneAndUpdate({_id : user?._id}, { $pull: { wishlist: {productId : ObjectId(id)} } },{new : true})

        return res.json({
            success : true,
            message : "product removed from wishlist successfully",
            data : removeFromWishlist
        })

    }catch(error){
        return res.send(error.message)
    }
}

module.exports.wishlist = async (req, res) => {
    try{

        const user = req.user

        const wishlist = await userModel.find({_id : user._id})
            .populate("wishlist.productId")
            .select("-password -userType")

        return res.json({
            success : true,
            message : "Wishlist",
            data : wishlist
        })

    }catch(error){
        return res.send(error.message)
    }
}