const mongoose = require('mongoose');

const newsScheme = new mongoose.Schema ({
  name: String,
  text: String,
  author: {
    name: String,
    id: {
      type: String,
      default: Date.now()
    }
  },
  tags: [],
  image: String
});

const News = mongoose.model('News', newsScheme);

module.exports = News;
