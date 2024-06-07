import multer from 'multer';

export default multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uploadFile = file.originalname.split('.');
    const name = `${uploadFile[0]}-${Date.now()}.${uploadFile[uploadFile.length - 1]}`;
    cb(null, name);
  },
});
