const request = require('request')

const appid = process.env.ONESIGNAL_APP_ID
const appkey = process.env.REST_API_KEY

module.exports.register = (userId, deviceId, deviceType) => {
    let options = {
        uri: 'https://onesignal.com/api/v1/players',
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Basic ${appkey}`
        },
        json: {
            "app_id": appid,
            "identifier": deviceId,
            "device_type": deviceType == "Android" ? 1 : 0
        }
    }
    //TODO find by userId and update the osdi with body.id
    return new Promise((resolve, reject) => {
        request(options, resolve)
    })
}

module.exports.sendNotification = (players, heading, text, data) => {
    let options = {
        uri: 'https://onesignal.com/api/v1/notifications',
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Basic ${appkey}`
        },
        json: {
            "app_id": appid,
            "contents": { "en": text, "es": text },
            "headings": { "en": heading, "es": heading },
            "include_player_ids": players,
            "priority": 10,
            "data": data
        }
    }
    return new Promise((resolve, reject) => {
        request(options, resolve)
    })
}