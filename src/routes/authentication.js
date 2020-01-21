const express = require('express')
const login = require('../services/authentication/login')
const { sendNotification } = require('../services/onesignal/onesignal')

const router = express.Router()

router.post('/login', (req, res) => {
  login(req, res)
})

router.get('/sendNotification', async(req, res) => {
  await sendNotification([], 'Softek', 'Time to check in!', {}, 'https://home.softtek.com/')
  res.status(200).send("Push notification sent!!");
})

module.exports = router
