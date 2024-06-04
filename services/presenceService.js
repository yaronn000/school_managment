const Presence = require('../models/presence')
const bcrypt = require('bcrypt')
const ApiError = require('../middleware/apiError')
const UserInfo = require("../dtos/userInfoDto")
const db = require('../models')

class PresenceService {

    async createPresence(data) {
        let {feedback, homework, lessonId, studentId} = data
        const presence = await Presence.create({feedback, homework, lessonId, studentId})
        return presence
    }

    async updatePresence(data) {
        let {feedback, homework, lessonId, studentId} = data
        const pres = await Presence.findOne({where: {lessonId, studentId}})
        const presence = await Presence.update({feedback, homework}, {where: {id: pres.id}})
        return pres
    }
}

module.exports = new PresenceService