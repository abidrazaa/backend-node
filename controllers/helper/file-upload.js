var multer = require('multer')

module.exports = () => {

    let upload = {
        destination: function (req, file, cb) {
          cb(null, './public/storage')
        },
        filename: function (req, file, cb) {
          let uploadFile = file.originalname.split('.')
          let name = `${uploadFile[0]}-${Date.now()}.${uploadFile[uploadFile.length-1]}`
          cb(null, name)
        }
    }
    storage = multer.diskStorage(upload)
    return multer({ 
        storage: storage,
        limits: {
            fields: 5,
            fieldNameSize: 50,
            fieldSize: 20000,
            fileSize: 15000000,
        }
    })
}