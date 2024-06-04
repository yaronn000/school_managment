const Report = require('../models/report')
const presenceService = require('./presenceService')
const db = require('../models')
const { where } = require('sequelize')

class ReportService {

    async createReport(data) {
        let {count, description, images, lessonId} = data
        const report = await Report.findOne({where: {lessonId}})
        if (report) {
            await this.updateReport(report.id, data)
            return report.id 
        }
        const newReport = await Report.create({count, description, images, lessonId})
        const {presences} = data
        for (let i = 0; i < presences.length; i++) {
            presenceService.createPresence(presences[i])
        }
        return newReport
    }

    async updateReport(id, data) {
        let {count, description, images, lessonId} = data
        const report = await Report.update({count, description, images, lessonId}, {where: {id}})
        const {presences} = data
        for (let i = 0; i < presences.length; i++) {
            presenceService.updatePresence(presences[i])
        }
        return id
    }

    async getOne(id) {
        let report = await Report.findOne({where: {lessonId: id}, attributes: ['id', 'count', 'description', 'images'], include: [
            {
                model: db.Lesson,
                attributes: ['id', 'date', 'time'],

                include: [
                    {
                        model: db.Account,
                        attributes: ['id', 'surname', 'name', 'patronymic']
                    },
                    {
                        model: db.Group,
                        attributes: ['id', 'name', 'subject'],
                        include: [
                            {
                                model: db.Student,
                                attributes: ['id', 'surname', 'name', 'patronymic'],
                                include: [
                                    {
                                        model: db.Presence,
                                        attributes: ['id', 'feedback', 'homework'],
                                        where: {
                                            lessonId: id
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
        }
        )
        return report
    }
}

module.exports = new ReportService