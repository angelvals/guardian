const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'dev'
const config = require('./db')[env]

const sequelize = new Sequelize(config.database, config.databaseUser, config.databasePassword, {
  dialect: 'mysql',
  host: config.databaseURL,
  port: config.databasePort,
  driver: 'tedious',
  // set to true when you want to output sql logging
  logging: false
})

sequelize
  .authenticate().then(() => {
    sequelize.sync()
  })
  .catch((err) => {
    throw new Error(`${err} Exiting to restart container!`)
  })

exports.sequelize = sequelize
