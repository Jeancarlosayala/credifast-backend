const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User')

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
}

passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: "NoobCoder"
}, (payload, done) => {
  User.findById({ _id: payload.sub }, (err, user) => {
    if (err)
      return done(err, false);
    if (user)
      return done(null, user);
    else
      return done(null, false);
  });
}));

// passport.use( 'local', new LocalStrategy((_id,password,done) =>{
//   User.findOne({email},(err,user)=>{
//       // something went wrong with database
//       if(err)
//           return done(err);
//       // if no user exist
//       if(!user)
//           return done(null,false);
//       // check if password is correct
//       user.comparePassword(password,done);
      
//   });
// }));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (email, password, done) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return done(null, false);
  }
  if (!user.comparePassword(password)) {
    return done(null, false)
  }

  done(null, user)
}))