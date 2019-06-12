const Sequelize = require('sequelize')
const { sequelize } = require('../../config/sequelize.js')

const define = (modelName, model, options = {}) => {
  model.createdBy = Sequelize.STRING
  model.updatedBy = Sequelize.STRING
  model.active = Sequelize.BOOLEAN
  options.freezeTableName = true
  return sequelize.define(modelName, model, options)
}

module.exports = define