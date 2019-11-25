const express = require('express')
const router = express.Router()

const { deletePost, createPost, getPost, updatePost } = require('../services/posts/postService')

router.get('/', (req, res) => {
  getPost(req, res)
})

router.post('/', (req, res) => {
  createPost(req, res)
})

router.put('/:id', (req, res) => {
  updatePost(req, res)
})

router.delete('/:id', (req, res) => {
  deletePost(req, res)
})

module.exports = router
