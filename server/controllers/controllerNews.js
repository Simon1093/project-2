const News = require('../models/news');

exports.getAllNews = (req, res) => {
  News.find({})
    .then(news => res.send(news))
    .catch( err => res.send(err))
};

exports.addNews = (req, res) => {
    const { name, text, tags, author} = req.body;
    News.create({ name, text, tags, author })
      .then((news)=>res.send(news._id))
      .catch(err=>res.send(err))
};

exports.addNewsImage = (req, res, next) => {
    News.findByIdAndUpdate(req.params.id, { image: req.file.path })
      .then(news => {
        res.send(news);
      });
};

exports.findNews = (req, res) => {
  News.find({'author.id': req.body.userId})
    .then(news => res.send(news))
    .catch(err=>res.send(err))
};
