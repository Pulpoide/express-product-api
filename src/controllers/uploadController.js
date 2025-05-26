const multer = require('multer');
const path = require('path');
const AppError = require('../utils/AppError');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes (JPEG, PNG, GIF)'));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.uploadFile = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return next(new AppError(err.message || 'Error al subir el archivo', 400));
    }

    if (!req.file) {
      return next(new AppError('No se proporcionó ningún archivo', 400));
    }

    res.status(200).json({
      success: true,
      filename: req.file.filename,
      path: `/images/${req.file.filename}`,
    });
  });
};
