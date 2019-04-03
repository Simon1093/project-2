const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const GooglePlusTokenStrategy = require('passport-google-plus-token');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Users.findById(id, function (err, user) {
    done(err, user);
  });
});

const GOOGLE_CLIENT_ID = '772896074949-mbb0bq76bls8p1d1a7mctv93p6e0vc70.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'R24VXYkrGIfMwaj2h0fIQ19y';

passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {

    Users.findOne({
      email: profile.emails[0].value
    }).then(user => {
      if(user) {
        return done(null, user)
      }
      else {
        const newUser = new Users({
          firstName: profile.name.givenName,
          secondName: profile.name.familyName,
          email: profile.emails[0].value,
          password: '0',
          avatar: profile.photos[0].value
        });

        bcrypt.genSalt(10, (err, salt) => {
          if(err) console.error('There was an error', err);
          else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) console.error('There was an error', err);
              else {
                newUser.password = hash;
                newUser.save()
                  .then(() => {
                    done(null, newUser)
                  });
              }
            });
          }
        });
      }
    });

  } catch(error) {
    done(error, false, error.message);
  }
}));

passport.use(new LocalStrategy({usernameField: 'email'},
  function (email, password, done) {

    Users.findOne({email})
      .then(user => {
        if (!user) {
          // errors.email = 'User not found'
          return done(null, false, {message: 'Incorrect username.'});
        }
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              done(null, user)
            } else {
              return done(null, false, {message: 'Incorrect password.'});
            }
          });
      });


    // Users.findOne({ email: email }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (user.password!==password) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));
