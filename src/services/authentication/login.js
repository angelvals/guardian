const passport = require('passport')

const login = (req, res) => {

  passport.authenticate('local', { session: false }, (err, user, info) => {

    //console.log(user)

    if (err || !user) {
      return res.status(401).json({
        message: info ? info.message : 'Login failed'
      })
    }

    return res.status(200).json(user.authJson())
  })(req, res)
}

module.exports = login
