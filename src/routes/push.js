const express = require('express')
const router = express.Router()
const { sendNotification } = require('../services/onesignal/onesignal')
const { setPushToken, deletePushToken } = require('../services/users/userService')
const { createPost } = require('../services/posts/postService')

router.post('/register', async(req, res) => {
  setPushToken(req, res)
  //res.json(await register(0, req.body.deviceId, req.body.deviceType))
})


router.post('/unregister', async(req, res) => {
  deletePushToken(req, res)
  //res.json(await register(0, req.body.deviceId, req.body.deviceType))
})


router.post('/sendNotification', async(req, res) => {
  await sendNotification(req.body.players, req.body.Header, req.body.Content, req.body.data, '')
  createPost(req, res)
})

module.exports = router