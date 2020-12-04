const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/Selling-project';
module.exports = () => {
  if (!mongoose.connection.readyState) {
    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('DB Connected'.yellow))
      .catch((err) => console.log(err.message));
  }
};
