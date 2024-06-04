const UserDto = require("../dtos/userDto")
const tokenService = require("./tokenService")
const bcrypt = require('bcrypt');
const ApiError = require('../middleware/apiError')
const Account = require('../models/account')
const models = require('../models')
const db = require('../models')


class UserService {

    async login(email, password) {

        const user = await models.Account.findOne({where: {email}, include: [{model: db.Role}]})
        if (!user) {
            throw ApiError.internalError('Пользователь с таким email не найден')
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            throw ApiError.internalError('Неверный пароль');
        }

        const userDto = new UserDto(user)

        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenInDB = await tokenService.findToken(refreshToken);
        if (!userData || !tokenInDB) {
            throw ApiError.forbiddenAccess();
        }
        const user = await Account.findOne({where: {id: userData.id}, include: [{model: db.Role}]});
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

}


module.exports = new UserService();