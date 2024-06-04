const reportService = require("../services/reportService");

class ReportController {

    async createReport(req, res, next) {
        try {
            const data = req.body;
            const reportData = await reportService.createReport(data);
            return res.json(reportData);
        } catch (e) {
            next(e);
        }
    }

    async getOneReport(req, res, next) {
        try {
            const {id} = req.params
            const report = await reportService.getOne(id)
            return res.json(report)
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new ReportController()