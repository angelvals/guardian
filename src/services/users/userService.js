const User = require('../../models/Admin/User')

const createUser = (req, res) => {
    User.create(req.body).then((user)=>{
        res.json(user)
    })
}

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

const getAllUsers = (req, res) => {
    return User.findAll({
        raw : true
    }).then( users => {
        if(res) {
            res.json(users)
        } else {
            return users
        }
    })
}

module.exports = { setPushToken, deletePushToken, getAllUsers, createUser }
