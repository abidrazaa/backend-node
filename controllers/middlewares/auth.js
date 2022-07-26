const jwt = require("jsonwebtoken")
const TOKEN_KEY = process.env.TOKEN_KEY
const userModel = require("../../models/user")


module.exports.isAdmin = async (req, res, next) => {

    const {email} = req.body;
    let token = req.headers["x-auth-token"] || req.body.token || req.query.token;

    if(token){
        const decoded = jwt.verify(token,TOKEN_KEY)
        req.user = decoded

        const user = await userModel.findOne({_id : decoded?._id, userType : "ADMIN"})
            .select("-password")

        if(!user){
            return res.send("Insufficient User Permissions")
        }
        return next()
    }
    else{
        return res.status(400).json({ msg: "No Auth Token Found", err: "No Auth Token Found" });
    }


    // console.log("email ==> ", email)
    // const isAdmin = await userModel.findOne({email, userType : "ADMIN"})

    // if(isAdmin){
    //     return next();
    // }else{
    //     return res.status(401).json({ msg: "Insufficient User Permissions", err:"Insufficient User Permissions" });
    // }

}


module.exports.checkAuth = async (req, res, next) => {
    try{

        let token = req.headers["x-auth-token"] || req.body.token || req.query.token;

        if(token){
            const decoded = jwt.verify(token,TOKEN_KEY)
            req.user = decoded

            const user = await userModel.findOne({_id : decoded?._id})
                .select("-password")

            if(!user){
                return res.send("Authentication failed")
            }
            return next()
        }
        else{
            return res.status(400).json({ msg: "No Auth Token Found", err: "No Auth Token Found" });
        }

    }catch(error){

    }
}