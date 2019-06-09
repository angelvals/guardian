const express = require('express')
const login = require('../services/authentication/login')

const router = express.Router()

router.post('/login', (req, res) => {
  login(req, res)
})

module.exports = router
