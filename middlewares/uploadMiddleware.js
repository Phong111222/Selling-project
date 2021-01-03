const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return cb(
      new Error(`Do not support ${path.extname(file.originalname)}`),
      false
    );
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(`${__dirname}/../uploads`));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//avatar-[time].png

const upload = multer({ storage, fileFilter });

module.exports = upload;
