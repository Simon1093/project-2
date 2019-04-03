const mongoose = require('mongoose');
const mongodb = 'mongodb://localhost:27017/newsdb';

mongoose.connect(mongodb, { useNewUrlParser: true }, function (err) {
  if (err) throw err;
  console.log('Successfully connected');
});
