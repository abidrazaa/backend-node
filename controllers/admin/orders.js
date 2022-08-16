const ordersModel = require("../../models/order")

module.exports.getAllOrders = async (req, res) => {
    try{

        const orders = await ordersModel.find()
            .populate({path : "user" , select : "-password -token"})
            .populate("items.productId")
            .populate("items.categoryId")

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

module.exports.getCurrentDate = async () => {

    var today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = String(today.getDate()).padStart(2, '0');
    let month = months[today.getMonth()];
    let year = today.getFullYear();
    today = month + " " + day + ', ' + year;
    return today

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

        var today = await this.getCurrentDate()
        
        var statusUpdate;
        if(status == "shipped"){
            statusUpdate = await ordersModel.findOneAndUpdate({_id : orderId},{status : status, shippedOn : today}, {new : true})
        }
        else if(status == "delivered"){
            statusUpdate = await ordersModel.findOneAndUpdate({_id : orderId},{status : status, deliveredOn : today}, {new : true})
        }
        else{
            statusUpdate = await ordersModel.findOneAndUpdate({_id : orderId},{status : status}, {new : true})
        }

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

