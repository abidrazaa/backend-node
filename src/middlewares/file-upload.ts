import multer from 'multer';
import { BaseMiddleWare } from 'types/common';

export const uploadFile: BaseMiddleWare = async (req, res, next) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/storage/');
      },
      filename: function (req, file, cb) {
        const uploadFile = file.originalname.split('.');
        const name = `${uploadFile[0]}-${Date.now()}.${uploadFile[uploadFile.length - 1]}`;
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, name);
      },
    });

    const upload = multer({ storage: storage });

    upload.array('photos', 12);
    return next();
  } catch (error) {
    return res.status(500).json({ err: 'something went wrong', msg: error.message });
  }
};
