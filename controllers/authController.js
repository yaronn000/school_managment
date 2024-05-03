const Account = require('../models/account')
const bcrypt = require('bcrypt')
const ApiError = require('../middleware/apiError')
const jwt = require('jsonwebtoken')
const RefreshToken = require('../models/refreshToken')
const userService = require('../services/userService')

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
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({accessToken: userData.accessToken, refreshToken: userData.refreshToken});
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({accessToken: userData.accessToken, refreshToken: userData.refreshToken});
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async getInformation(req, res) {

        const {id} = req.params
        const user = await Account.findOne({where: {id}})
        return res.json(user)   
    }
}

module.exports = new AuthController()