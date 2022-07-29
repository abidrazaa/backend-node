const multer  = require('multer')

module.exports.uploadProfileImage = async (req, res) => {

    let files = req.files
    console.log("here")
    return res.send(files)

    const { userID } = req.user
    let file = req.files[0]
    try {
        if(!file){
            return res.status(400).json({ err:'Please upload an image', msg:'Please upload an image' })
        }
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            // let user = await UserModel.findByIdAndUpdate({ _id:userID, }, { profile_image:file.filename, profileImage:file.filename }, { new:true }).select('-__v -password -token -socketId -created_at -online')
            // user.profile_image = `storage/${user.profile_image}`
            // return res.status(200).json({profileImage: user.profile_image, storagePath: `${req.appUrl}storage/` })   
            return res.send(file.filename) 
        } else {
            await unlink(`${__dirname}../../../public/storage/${file.filename}`)
            return res.status(500).json({ err:'Only .png, .jpg and .jpeg format allowed!', msg:'Only .png, .jpg and .jpeg format allowed!'});
        }
        
    } catch (error) {
        return res.status(500).json({ err:"something went wrong", msg:error.message })    
    }
}
