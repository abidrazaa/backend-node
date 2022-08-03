const orderModel = require("../../models/order")
const userModel = require("../../models/user")
const productModel = require("../../models/product")

module.exports.dashboardData = async (req, res) => {

    try{

        // counts 
        const ordersCount = await orderModel.find().count()
        const usersCount = await userModel.find().count()
        const productsCount = await productModel.find().count()
        const categoriesCount = 5

        return res.json({
            success : true,
            message : "dashboard data",
            data : {
                ordersCount,
                usersCount,
                productsCount,
                categoriesCount
            }
        })

    }catch(error){
        res.send(error.message)
    }

}