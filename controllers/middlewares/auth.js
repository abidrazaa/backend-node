
const userModel = require("../../models/user")

module.exports.isAdmin = async (req, res, next) => {

    const {email} = req.body;

    console.log("email ==> ", email)
    const isAdmin = await userModel.findOne({email, userType : "ADMIN"})

    if(isAdmin){
        return next();
    }else{
        return res.status(401).json({ msg: "Insufficient User Permissions", err:"Insufficient User Permissions" });
    }

}