const ordersModel = require("../../models/order")

module.exports.getAllOrders = async (req, res) => {
    try{

        const orders = await ordersModel.find()
            .populate({path : "user" , select : "-password -token"})
            .populate("items.productId")

        // const orders = await ordersModel.aggregate([
        //     {
        //         $lookup : {
        //             from : "users",
        //             localField : "user",
        //             foreignField : "_id",
        //             as : "user"
        //         }
        //     },
        //     { $unwind: "$items" },
        //     {
        //         $lookup : {
        //             from : "products",
        //             localField : "items.productId",
        //             foreignField : "_id",
        //             as : "items.productId"
        //         }
        //     }
        // ])


        const ordersCount = await ordersModel.find().count()

        return res.json({
            success : true,
            message : "all orders",
            status : 200,
            data : orders,
            ordersCount
        })

    }catch(error){

        return res.send(error.message)
    }
}

module.exports.changeStatusOfOrder = async (req, res) => {
    try{

        const {status, orderId} = req.query

        if(!orderId || !status){
            return res.json({
                success : false,
                message : "status or order Id is missing"
            })
        }
        if(!["delivered","pending","shipped"].includes(status)){
            return res.json({
                success : false,
                message : "wrong status"
            })
        }

        const statusUpdate = await ordersModel.findOneAndUpdate({_id : orderId},{status : status}, {new : true})

        return res.json({
            success : true,
            message : "status updated successfully",
            status : 200,
            data : statusUpdate
        })

    }catch(error){
        return res.send(error.message)
    }
}

