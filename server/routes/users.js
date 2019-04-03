const express = require('express');
const router = express.Router();
const passport = require('passport');
const compose = require('composable-middleware');
const jwt = require('jsonwebtoken');
const controllerUser = require('../controllers/controllerUser');
const multer  = require('multer');

const isAuthenticated =(req,res,next)=> {
  if (req.headers.authorization[0]==='B') {
    req.user = jwt.decode(req.headers.authorization.replace('Bearer ', ''));
    return next();
  } else {res.status(401).send()}
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/get-guest/:id', controllerUser.getUserGuest);

router.get(
  '/get',
  controllerUser.getUser);

router.get(
  '/logout',
  controllerUser.logoutUser);

router.post('/register', controllerUser.registerUser);

router.post(
  '/login',
  passport
    .authenticate(
      'local',
      { session: false }
      ),
  controllerUser.loginUser);

router.post('/', controllerUser.addUser);

router.post(
  '/uploadAvatar/:id',
  isAuthenticated,
  upload.single('avatar'),
  controllerUser.uploadAvatar);

router.put('/editUsers/:id',
  isAuthenticated,
  controllerUser.editUser);

router.post('/oauth/google', passport.authenticate('googleToken', { session: false }), controllerUser.googleOAuth);

module.exports = router;

