const Sequelize = require('sequelize')
const define = require('./Admin/Model')
const User = require('./Admin/User')

const Post = define('Post', {
  Header: Sequelize.STRING,
  Content: Sequelize.STRING,
  Latitude: Sequelize.FLOAT,
  Longitude: Sequelize.FLOAT,
  Legacy: Sequelize.BOOLEAN
})

Post.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'restrict',
  onUpdate: 'restrict',
});

Post.afterCreate((post) => {
  global.io.emit('newPost', post)
})

module.exports = Post
