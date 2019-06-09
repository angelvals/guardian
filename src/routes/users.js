const express = require('express')
const router = express.Router()

const User = require('../models/Admin/User')

router.get('/', (req, res) => {
  User.findAll().then( users => {
    res.json(users)
  })
})

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
  return res.json(req.user)
})

module.exports = router
