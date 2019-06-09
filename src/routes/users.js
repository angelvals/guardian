const express = require('express')
const router = express.Router()

const User = require('../models/Admin/User')

router.post('/', (req, res) => {
  //Create new user
  User.create(req.body).then((user)=>{
    res.json(user)
  })
})

router.get('/logout', (req, res) => {
  res.json({})
})

router.get('/sess', (req, res) => {
  return res.status(401).json({
    message: 'Login failed'
  })
})

module.exports = router
