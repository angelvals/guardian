const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

router.get('/', (req, res) => {
  Post.findAll().then( posts => {
    res.json(posts)
  })
})

router.post('/', (req, res) => {
  //Create new post
  Post.create(req.body).then((post)=>{
    res.json(post)
  })
})

module.exports = router
