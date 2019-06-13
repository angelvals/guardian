const express = require('express')
const router = express.Router()

const { deletePushToken, getAllUsers, createUser } = require('../services/users/userService')

router.get('/', (req, res) => {
  getAllUsers(req, res)
})

router.post('/', (req, res) => {
  createUser(req, res)
})

router.get('/logout', (req, res) => {
  deletePushToken(req, res)
})

router.get('/sess', (req, res) => {
  return res.json(req.user)
})

module.exports = router
