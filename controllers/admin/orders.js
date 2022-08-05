const ordersModel = require("../../models/order")

module.exports.getAllOrders = async (req, res) => {
    try{

        const orders = await ordersModel.find()
            .populate({path : "user" , select : "-password -token"})

        return res.json({
            success : true,
            message : "all orders",
            status : 200,
            data : orders
        })

    }catch(error){

        return res.send(error.message)
    }

}

module.exports.changeStatus = async (req, res) => {
    
}

