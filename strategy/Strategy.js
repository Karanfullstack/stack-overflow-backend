const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User')

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY

module.exports = (passport) =>{
  passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
    User.findById(jwt_payload._id).then((user)=>{
      if(user){
        return done(null, user)
      }
      return done(null, false)
    }).catch((error)=> console.log(error))
  }))
}
