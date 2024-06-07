import { Request } from 'express';
import multer from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export default () => {
  const upload = {
    destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
      cb(null, './public/storage');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
      const uploadFile = file.originalname.split('.');
      const name = `${uploadFile[0]}-${Date.now()}.${uploadFile[uploadFile.length - 1]}`;
      cb(null, name);
    },
  };
  const storage = multer.diskStorage(upload);
  return multer({
    storage: storage,
    limits: {
      fields: 5,
      fieldNameSize: 50,
      fieldSize: 20000,
      fileSize: 15000000,
    },
  });
};
