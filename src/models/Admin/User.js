const Sequelize = require('sequelize')
const crypto = require('crypto')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const define = require('./Model')

const User = define('User', {
  UserName: Sequelize.STRING,
  Email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  Password: Sequelize.STRING,
  Salt: Sequelize.STRING,
  PushToken: Sequelize.STRING
})

User.prototype.validatePassword = function validatePassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.Salt, 10000, 64, 'sha512').toString('hex')
  return this.Password === hash
}

User.prototype.generateJWT = function generateJWT() {
  const expirationDate = moment().add(60, 'minutes').valueOf()
  return jwt.sign({
    username: this.UserName,
    email: this.Email,
    exp: expirationDate,
  }, 'secret')
}

User.prototype.authJson = function authJson() {
  return {
    username: this.UserName,
    email: this.Email,
    token: this.generateJWT(),
  }
}

User.beforeCreate((user) => {
  const salt = crypto.randomBytes(16).toString('hex')
  user.Salt = salt
  user.Password = crypto.pbkdf2Sync(user.Password, salt, 10000, 64, 'sha512').toString('hex')
})

module.exports = User
