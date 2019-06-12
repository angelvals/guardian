const Post = require('../../models/Post')

const getPost = (req, res) => {
    Post.findAll().then( posts => {
      res.json(posts)
    })
}
  
const createPost = (req, res) => {
    //Create new post
    req.body.UserId = req.user.id
    Post.create(req.body).then((post)=>{
      res.json(post)
    })
}
  
const deletePost = (req, res) => {
    Post.destroy({
        where: { id: req.params.id }
    }).then((post)=>{
        res.json(post)
    })
}

module.exports = { deletePost, createPost, getPost }
