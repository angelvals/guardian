const User = require('../../models/Admin/User')

const setPushToken = (req, res) => {
    User.update(
        { PushToken: req.body.pushToken },
        { where: { id: req.user.id } }
    ).then((user)=>{
        res.json({
            success: true
        })
    })
}

const deletePushToken = (req, res) => {
    User.update(
        { PushToken: null },
        { where: { id: req.user.id } }
    ).then((user)=>{
        res.json({
            success: true
        })
    })
}

module.exports = { setPushToken, deletePushToken }
