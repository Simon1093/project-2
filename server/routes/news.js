const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const controllerNews = require('../controllers/controllerNews');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const isAuthenticated =(req,res,next)=> {
  if (req.headers.authorization[0]==='B') {
    req.user = jwt.decode(req.headers.authorization.replace('Bearer ', ''));
    return next();
  } else {res.status(401).send('unauthorized')}
};


router.get('/', controllerNews.getAllNews);

router.post('/addNews', isAuthenticated, controllerNews.addNews);

router.post('/uploadImage/:id', upload.single('image'), controllerNews.addNewsImage);

router.post('/find', controllerNews.findNews);

module.exports = router;
