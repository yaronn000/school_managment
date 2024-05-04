const adminService = require("../services/adminService");



class AdminController {

    async createUser(req, res, next) {
        try {
            const data = req.body;
            const userData = await adminService.createUser(data);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const {id} = req.params;
            await adminService.deleteUser(id);
            return res.json({message: "Пользователь удален"});
        } catch (e) {
            next(e);
        }
    }

    async updateUser(req, res, next) {
        try {
            const {id} = req.params;
            const updatedData = req.body
            await adminService.updateUser(id, updatedData);
            return res.json({message: "Данные пользователя обновлены"});
        } catch (e) {
            next(e);
        }
    }

}


module.exports = new AdminController()