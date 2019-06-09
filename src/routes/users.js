const express = require('express')
const router = express.Router()

const User = require('../models/Admin/User')
const { deletePushToken } = require('../services/users/userService')

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
  deletePushToken(req, res)
})

router.get('/sess', (req, res) => {
  return res.json(req.user)
})

module.exports = router
