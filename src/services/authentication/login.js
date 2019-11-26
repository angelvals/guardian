const passport = require('passport')

const login = (req, res) => {

  passport.authenticate('local', { session: false }, (err, user, info) => {

    //console.log(user)

    if (err || !user) {
      return res.status(401).json({
        message: err ? err.errors.message : 'Login failed'
      })
    }
    res.headers.authorization = user.generateJWT();
    res.setHeader("X-Bearer-Token", user.generateJWT());
    return res.status(200).json(user.authJson())
  })(req, res)
}

module.exports = login
