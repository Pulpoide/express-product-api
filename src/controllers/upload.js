const multer = require('multer');
const nroFecha = Date.now();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        //console.log(file)
        cb(null, `${nroFecha}-${file.originalname}`)
    }
});

const upload = multer({ storage: storage});

exports.upload = upload.single('file');
