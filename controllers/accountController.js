const Account = require('../models/account')


class AccountController {


    async createAccount(req, res) {

        let {surname, name, patronymic, email, password, roleId} = req.body
        const account = await Account.create({surname, name, patronymic, email, password, roleId})
        return res.json(account)

    }

    async getAll(req, res) {
        
    }
}

module.exports = new AccountController()