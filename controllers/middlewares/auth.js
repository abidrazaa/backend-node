const jwt = require("jsonwebtoken")
const TOKEN_KEY = process.env.TOKEN_KEY
const userModel = require("../../models/user")


module.exports.isAdmin = async (req, res, next) => {

    const {email} = req.body;
    // receiving token from the header
    let token = req.headers["x-auth-token"] || req.body.token || req.query.token;

    if(token){
        try{
            // decode token with TOKEN key to extract the user
            const decoded = jwt.verify(token,TOKEN_KEY)

            // saving the current user in req.user
            req.user = decoded

            // checking if the logged in user is ADMIN or not
            const user = await userModel.findOne({_id : decoded?._id, userType : "ADMIN"})
                .select("-password")

            if(!user){
                // if not admin
                return res.send("Insufficient User Permissions")
            }

            // if admin, pass to the next function call
            return next()

        }catch(error){
            return res.status(401).json({ msg: "Invalid User Auth Token", err: error.message });     
        }

    }
    else{
        return res.status(400).json({ msg: "No Auth Token Found", err: "No Auth Token Found" });
    }
}


module.exports.checkAuth = async (req, res, next) => {
    try{

        let token = req.headers["x-auth-token"] || req.body.token || req.query.token;

        if(token){
            try{

                const decoded = jwt.verify(token,TOKEN_KEY)
                req.user = decoded

                const user = await userModel.findOne({_id : decoded?._id})
                    .select("-password")

                if(!user){
                    return res.send("Authentication failed")
                }
                return next()

            }catch(error){
                
                return res.status(401).json({ msg: "Invalid User Auth Token", err: error.message });     
            }
        
        }
        else{
            return res.status(400).json({ msg: "No Auth Token Found", err: "No Auth Token Found" });
        }

    }catch(error){

    }
}