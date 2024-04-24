const Account = require('../models/account')
const bcrypt = require('bcrypt')
const ApiError = require('./apiError')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.ACCESS_SECRET_KEY,
        {expiresIn: '15m'})
}

class AccountController {


    async createAccount(req, res) {

        let {surname, name, patronymic, email, password, roleId} = req.body
        const hashPassword = await bcrypt.hash(password, 5)
        const account = await Account.create({surname, name, patronymic, email, password: hashPassword, roleId})
        return res.json(account)

    }

    async login(req, res, next) {

        let {email, password} = req.body
        const user = await Account.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internalError('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internalError('Неверный пароль'))
        }
        const accessToken = generateJwt(user.id, user.email, user.roleId)
        const refresh_token =  jwt.sign((user.id, user.email, user.roleId), process.env.REFRESH_SECRET_KEY)
        return res.json({accessToken})

    }

    async getInformation(req, res) {

        const {id} = req.params
        const user = await Account.findOne({where: {id}})

        return res.json(user)
        
    }
}

module.exports = new AccountController()