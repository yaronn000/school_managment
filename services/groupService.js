const Group = require('../models/group')
const bcrypt = require('bcrypt')
const ApiError = require('../middleware/apiError')
const db = require('../models')
const groupInfo = require("../dtos/groupDto")

class GroupService {

    async createGroup(groupData) {
        let {name, subject} = groupData
        const group = await Group.findOne({where: {name}})
        if (group) {
            throw ApiError.internalError('Группа с таким назанием уже существует')
        }
        const newGroup = await Group.create({name, subject})
        return newGroup
    }

    async deleteGroup(id) {
        await Group.destroy({where: {id}})
        return id
    }

    async updateGroup(id, data) {
        let {name, subject} = data
        await Group.update({name, subject}, {where: {id}})
        return id
    }

    async getAll() {
        const groups = await Group.findAll()
        for (let i = 0; i < groups.length; i++) {
            groups[i] = new groupInfo(groups[i])
          }
        return groups
    }

    async getOne(id) {
        let group = await Group.findOne({where: {id}})
        group = new groupInfo(group)
        return group
    }
}

module.exports = new GroupService