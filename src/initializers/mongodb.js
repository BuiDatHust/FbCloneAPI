const mongoose = require('mongoose');
const databases = require('../configs/databases');

const connectMongoDB = () => {
  mongoose
    .connect(databases.mongodb.url)
    .then(() => {
      console.log('MongoDB connection successfully');
    })
    .catch((error) => {
      console.log(error);
    });
  mongoose.set('debug', true);
};

module.exports = connectMongoDB;
