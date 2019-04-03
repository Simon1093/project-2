const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const Users = require('../models/users');
const News = require('../models/news');

exports.registerUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }
  Users.findOne({
    email: req.body.email
  }).then(user => {
    if(user) {
      return res.status(400).send({statusText:'Email already exists'});
    }
    else {
      const newUser = new Users({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        email: req.body.email,
        password: req.body.password,
        avatar: ''
      });

      bcrypt.genSalt(10, (err, salt) => {
        if(err) console.error('There was an error', err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) console.error('There was an error', err);
            else {
              newUser.password = hash;
              newUser
                .save()
                .then(() => {
                  res.json("ok")
                });
            }
          });
        }
      });
    }
  });
};

exports.logoutUser = (req,res)=>{
  req.logout();
  res.json('ok');
};

exports.loginUser = (req, res) => {
  const user = req.user;
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    avatar: user.avatar
  };
  jwt.sign(payload, 'secret', {
    expiresIn: 3600
  }, (err, token) => {
    if (err) console.error('There is some error in token', err);
    res.json({user, token: `Bearer ${token}`});
  });
};


exports.googleOAuth = (req, res) => {
    const payload = {
      id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      avatar: req.user.avatar
    };
    jwt.sign(payload, 'secret', {
      expiresIn: 3600
    }, (err, token) => {
      if (err) console.error('There is some error in token', err);
      res.json( {user:req.user, token: `Bearer ${token}`});
    });


};


exports.editUser = (req, res) => {
  const id = req.user.id;
  req.checkBody('firstName', 'Name is required').notEmpty();
  req.checkBody('secondName', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is is not valid').isEmail();

  const errors = req.validationErrors();

  if (errors) {
    res.send(errors)
  } else {
    Users.find({email: req.user.email})
      .then(users => {
        let compareEmail = users.length;
        if (users.length === 1 && users[0].email === req.user.email)
          compareEmail -= 1;
        if (compareEmail !== 0) throw "email already exist";
        Users.findByIdAndUpdate(id, req.body)
          .then(() => {
            Users.findById(id).then(user =>{
              News.find({'author.id': id})
                .then(news => {
                  news.map(item => {
                    item.author.name = `${user.firstName} ${user.secondName}`;
                    item.save()
                  });
                });
              res.json(user);
            }
            )
          })
          .catch(err => res.send(err))
      })
  }
};

exports.getUser = (req, res) => {
  const users = jwt.decode(req.headers.authorization.replace('Bearer ', ''));
  Users.findById(users.id)
    .then(user => {
      res.json(user);
    });
};

exports.addUser = (req, res) => {
  Users.create(req.body)
    .then( user => res.send(user))
    .catch(err => res.send(err))
};

exports.uploadAvatar = (req, res) => {
  Users.findByIdAndUpdate(req.params.id, {avatar: `http://127.0.0.1:3000/${req.file.path}`})
    .then(()=> {
      res.json({avatar: `http://127.0.0.1:3000/${req.file.path}`})})
    .catch(err => res.send(err))
};

exports.getUserGuest = (req, res) => {
  Users.findById(req.params.id)
    .then( user => res.send(user))
    .catch(err => res.send(err))
};


