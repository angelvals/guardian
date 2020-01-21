const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const moment = require('moment')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const User = require('../models/Admin/User')

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, callback) => User.findOne({ where: { UserName: username } })
  .then((user) => {
    if (!user || !user.validatePassword(password)) {
      return callback({ errors: { message: 'Username or password is invalid' } }, null)
    }
    return callback(null, user)
  }).catch(error => callback(error))))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
}, (jwtPayload, callback) => {
  //Validate token expiration
  if (moment(jwtPayload.exp, "x") < moment()) {
    // return callback(null, null)
  }
  User.findOne({ where: { UserName: jwtPayload.username } })
    .then(user => callback(null, user))
}))
