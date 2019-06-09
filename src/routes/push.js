const express = require('express')
const router = express.Router()
const { register, sendNotification } = require('../services/onesignal/onesignal')

router.post('/register', async(req, res) => {
  res.json(await register(0, req.body.deviceId, req.body.deviceType))
})

router.post('/sendNotification', async(req, res) => {
  await sendNotification(req.body.players, req.body.heading, req.body.text, req.body.data)
  res.json({ success: true })
})

module.exports = router