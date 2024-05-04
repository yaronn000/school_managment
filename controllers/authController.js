const sequelize = require('../db')
const userService = require('../services/userService')
const db = require('../models')


class AuthController {


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
        const user = await db.Account.findOne({where: {id}, include: [{model: db.Role}]})
        return res.json(user)   
    }
}

module.exports = new AuthController()