const Role = require('../models/role')


class RoleController {


    async createRole(req, res) {

        const {name} = req.body
        const role = await Role.create({name})
        return res.json(role)

    }

    async getAll(req, res) {
        
    }
}

module.exports = new RoleController()