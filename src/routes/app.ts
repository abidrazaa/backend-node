import express from 'express';
import multer from 'multer';
import path from 'path';

import storage from '@config/multer';

const router = express.Router();

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.webp' && ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

router.get('', (_req, res) => {
  res.json({ msg: 'Hello World!' });
});

router.post('/photos/upload', upload.array('photos', 12), function (req, res) {
  // req.files is array of `photos` files

  try {
    const files = req.files;
    if (!files) {
      return res.status(400).json({ err: 'Please provide file' });
    }
    if (!files.length) {
      return res.status(400).json({ err: 'Please upload an image' });
    }

    if (!Array.isArray(files)) {
      return;
    }

    return res.json({ images: files.map((f) => ({ ...f, path: f.path.replace('public', '') })) });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
});

export default router;
