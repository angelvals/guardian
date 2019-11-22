const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require('../../config/config.json')[env]

const db = process.env.DB || config.database;
const user = process.env.DB_USER || config.username;
const password = process.env.DB_PASSWORD || config.password;

const sequelize = new Sequelize(db, user, password, {
  dialect: 'mysql',
  host: config.host,
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
