const Account = require('../models/account')
const bcrypt = require('bcrypt')
const ApiError = require('../middleware/apiError')
const UserInfo = require("../dtos/userInfoDto")
const db = require('../models')

class AdminService {

    async createUser(userData) {
        let {surname, name, patronymic, email, password, roleId} = userData
        const user = await Account.findOne({where: {email}})
        if (user) {
            throw ApiError.internalError('Пользователь с таким email уже существует')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const account = await Account.create({surname, name, patronymic, email, password: hashPassword, roleId})
        return account
    }

    async deleteUser(id) {
        const user = await Account.destroy({where: {id}})
        return id
    }

    async updateUser(id, data) {
        let {surname, name, patronymic, email, roleId} = data
        const user = await Account.update({surname, name, patronymic, email, roleId}, {where: {id}})
        return id
    }

    async getAll() {
        const users = await Account.findAll()
        for (let i = 0; i < users.length; i++) {
            users[i] = new UserInfo(users[i])
          }
        return users
    }

    async getOne(id) {
        let user = await Account.findOne({where: {id}, include: [{model: db.Role}]})
        user = new UserInfo(user)
        return user
    }

}


module.exports = new AdminService