const Sequelize = require('sequelize')
const { define, relations } = require('./Admin/Model')
const Post = define('Post', {
  Header: Sequelize.STRING,
  Content: Sequelize.STRING,
  Latitude: Sequelize.FLOAT,
  Longitude: Sequelize.FLOAT
})

relations(Post);

Post.afterCreate((post) => {
  console.log(`Creating post`, post)
})

module.exports = Post
