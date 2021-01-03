const mongoose = require('mongoose');

class ConnectMongo {
  constructor() {
    this.gfs = null;
  }
  static getConnect() {
    mongoose.connect(process.env.URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    // khoi tao bucket ngay luc ket noi mongodb
    const connect = mongoose.connection;

    connect.once('open', () => {
      console.log('DB is connected');
      this.gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: process.env.MONGO_BUCKET,
      });
    });
  }
}

module.exports = ConnectMongo;
