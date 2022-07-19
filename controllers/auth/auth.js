const userModel = require("../../models/user")

module.exports.login = async (req, res) => {

    try{
        const { email, password } = req.body;
        let user = await userModel.findOne({email, password})

        if(!user){
            return res.json({
                success : true,
                message : "user does not exist with this email and password"
            })
        }

        return res.json({
            success : true,
            message : "user Logged in",
            data : user
        })

    }catch(error){
        return res.send("error : ", error.message)
    }

    
}

module.exports.register = async (req, res) => {

    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({success : false, message : "name or password is empty"})
        }
    
        let user = new userModel(req.body)
        await user.save()
    
        return res.json(
            {
                success : true, 
                message : "user registered successfully", 
                data : user
            }
        )

    }catch(error){
        return res.send("error : ", error.message)
    }
    
}

module.exports.updateUser = async (req, res) => {

    try{
        const userDataToBeUpdated = req.body
        const { id } = req.query
        const user = await userModel.findOne({ _id : id })
    
        if(!user) return res.send("user does not exist")
    
        let updatedUser = await userModel.findOneAndUpdate({_id : id}, userDataToBeUpdated, {new : true})
    
        return res.json({
            success : true,
            message : "user updated successfully",
            data : updatedUser
        })

    }catch(error){
        return res.send("error : ", error.message)
    }
}

module.exports.deleteUser = async (req, res) => {
    try{

        const { id } = req.query

        console.log("id ==> ",id)

        const user = await userModel.findOne({_id : id})
        if(!user) return res.status(200).send("user does not exist");

        await userModel.findOneAndDelete({_id : id})

        return res.json({
            success : true,
            message : "user deleted successfully"
        })

    }catch(error){
        return res.status(400).send(error.message);
    }
}

module.exports.userById = async (req, res) => {
    try{

        const { id } = req.query

        const user = await userModel.findOne({_id : id})
        if(!user) return res.send("user does not exist")

        return res.json({
            success : true,
            message : "user deleted successfully",
            data : user
        })

    }catch(error){
        return res.send("error : ", error.message)
    }
}