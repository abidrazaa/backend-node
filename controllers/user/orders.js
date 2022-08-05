const ordersModel = require("../../models/order")

module.exports.orders = async (req, res) => {
    try{

        const user = req.user
        const orders = await ordersModel.find({user : user._id})

        return res.json({
            success : true,
            message : "orders",
            data : orders
        })

    }catch(error){
        return res.send(error.message)
    }
}