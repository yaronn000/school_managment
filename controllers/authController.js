const Account = require('../models/account')
const bcrypt = require('bcrypt')
const ApiError = require('../middleware/apiError')
const jwt = require('jsonwebtoken')
const RefreshToken = require('../models/refreshToken')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.ACCESS_SECRET_KEY,
        {expiresIn: '15m'})
}

class AuthController {


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
        const refresh_token =  jwt.sign({id: user.id, email: user.email, roleId: user.roleId}, process.env.REFRESH_SECRET_KEY, {expiresIn: '7d'})
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_SECRET_KEY)
        await RefreshToken.create({refreshToken: refresh_token, expiresIn: decoded.exp,  accountId: user.id})
        return res.json({accessToken, refresh_token})

    }

    async refresh(req, res) {
            try {
                const refreshToken = req.body.token
                if (!refreshToken) return res.status(401).json({message: "Пользователь не авторизован"})
                const tokenInDB = await RefreshToken.findOne({where: {refreshToken}})
                if (!tokenInDB) return res.status(403).json({message: "Невалидный токен"})
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY)
                await RefreshToken.destroy({where: {refreshToken}})
                const accessToken = generateJwt({id: decoded.id, email: decoded.email, roleId: decoded.roleId})
                const refreshNew = jwt.sign({id: decoded.id, email: decoded.email, roleId: decoded.roleId}, process.env.REFRESH_SECRET_KEY, {expiresIn: '7d'})
                const decodedNew = jwt.verify(refreshNew, process.env.REFRESH_SECRET_KEY)
                await RefreshToken.create({refreshToken: refreshNew, expiresIn: decodedNew.exp,  accountId: decodedNew.id})
                return res.json({accessToken, refreshNew})
            } catch (e) {
                res.status(403).json({message: "Невалидный токен 2"})
            } 
    }

    async logout(req, res) {

        const refreshToken = req.body.token
        if (!refreshToken) return res.status(401).json({message: "Пользователь не авторизован"})
        const tokenInDB = await RefreshToken.findOne({where: {refreshToken}})
                if (!tokenInDB) return res.status(403).json({message: "Невалидный токен"})
        await RefreshToken.destroy({where: {refreshToken}})
        return res.json("Logout success")
    }

    async getInformation(req, res) {

        const {id} = req.params
        const user = await Account.findOne({where: {id}})
        return res.json(user)   
    }
}

module.exports = new AuthController()