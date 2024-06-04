const groupService = require("../services/groupService");

class GroupController {

    async createGroup(req, res, next) {
        try {
            const data = req.body;
            const groupData = await groupService.createGroup(data);
            return res.json(groupData);
        } catch (e) {
            next(e);
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const {id} = req.params;
            await groupService.deleteGroup(id);
            return res.json({message: "Группа удалена"});
        } catch (e) {
            next(e);
        }
    }

    async updateGroup(req, res, next) {
        try {
            const {id} = req.params;
            const updatedData = req.body
            await groupService.updateGroup(id, updatedData);
            return res.json({message: "Данные группы обновлены"});
        } catch (e) {
            next(e);
        }
    }

    async getAllGroups(req, res, next) {
        try {
            const groups = await groupService.getAll();
            return res.json(groups)

        } catch (e) {
            next(e);
        }
    }

    async getOneGroup(req, res, next) {
        try {
            const {id} = req.params
            const group = await groupService.getOne(id)
            return res.json(group)
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new GroupController()