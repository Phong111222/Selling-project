const express = require('express');
const ConnectMongo = require('../../database/connectDB');
const mongoUpload = require('../../middlewares/mongoUpload');
const upload = require('../../middlewares/uploadMiddleware');
const ErrorResponse = require('../../models/response/error');
const SuccessResponse = require('../../models/response/success');

const router = express.Router();

router.post('/', mongoUpload.single('avatar'), (req, res, next) => {
  res.status(200).json(new SuccessResponse(200, req.file.filename));
});

router.get('/:filename', (req, res, next) => {
  const { filename } = req.params;

  const file = ConnectMongo.gfs.find({ filename }).toArray((err, files) => {
    if (!files || !files.length) {
      return next(new ErrorResponse(404, 'file is not found'));
    }
    ConnectMongo.gfs.openDownloadStreamByName(filename).pipe(res);
  });
});

module.exports = router;
