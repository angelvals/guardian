const Sequelize = require('sequelize')
const { sequelize } = require('../../config/sequelize.js')
const User = require('./User')

const define = (modelName, model, options = {}) => {
  model.createdBy = Sequelize.STRING
  model.updatedBy = Sequelize.STRING
  model.active = Sequelize.BOOLEAN
  options.freezeTableName = true
  return sequelize.define(modelName, model, options)
}

const relations = (modelName) => {
  modelName.belongsTo(User, {
	foreignKey: {
		allowNull: false,
	},
	onDelete: 'restrict',
	onUpdate: 'restrict',
	});
}

module.exports = { define, relations }
