const Lesson = require('../models/lesson')
const ApiError = require('../middleware/apiError')
const lessonInfo = require("../dtos/lessonDto")
const db = require('../models')
const { Op } = require('sequelize');

const getDates = (dt) => {
    const t = dt.split('-')
    const date = new Date(t[0], (t[1] - 1), t[2], 4)
    let begin = new Date(date)
    let end = new Date(date)
    const day = date.getDay()

    if (day === 0) {
        begin.setDate(date.getDate() - 6)
        end.setDate(date.getDate())
    }
    else if (day === 1) {
        begin.setDate(date.getDate())
        end.setDate(date.getDate() + (7 - day))    
    }
    else {
        begin.setDate(date.getDate() - day + 1)
        end.setDate(date.getDate() + (7 - day))   
    }

    begin = begin.toISOString()
    begin = begin.split('T')[0]
    end = end.toISOString()
    end = end.split('T')[0]
    
    return {begin, end}
}

function sortByDays(arr) {
    let sorted = [[], [], [], [], [], [], []]
    for (let i = 0; i < arr.length; i++) {
        const t = arr[i].date.split('-')
        const date = new Date(t[0], (t[1] - 1), t[2], 4)
        const day = date.getDay()
        if (day === 0) sorted[6].push(arr[i])    
        else sorted[day - 1].push(arr[i])    
    }
    return sorted
}

class LessonService {

    async createLesson(lessonData) {
        let {date, time, accountId, groupId} = lessonData
        const lesson = await Lesson.findOne({where: {date, time, groupId}})
        if (lesson) {
            throw ApiError.internalError('Такой урок уже существеут')
        }
        const newLesson = await Lesson.create({date, time, accountId, groupId})
        return newLesson
    }

    async deleteLesson(id) {
        const lesson = await Lesson.destroy({where: {id}})
        return id
    }

    async updateLesson(id, data) {
        let {date, time, accountId, groupId} = data
        const lesson = await Lesson.update({date, time, accountId, groupId}, {where: {id}})
        return id
    }

    async getAllForTeacher(accountId, date) {
        const dates = getDates(date)
        let lessons = await Lesson.findAll({order: [
            ['date', 'asc'],
            ['time', 'asc']
         ], where: {accountId, date: {[Op.between]: [dates.begin, dates.end]}}, include: [{model: db.Group}]})
        for (let i = 0; i < lessons.length; i++) {
            lessons[i] = new lessonInfo(lessons[i])
        }
        lessons = sortByDays(lessons)
        return lessons
    }

    async makeLessons(data, count) {
        for (let i = 0; i < count *4; i++) {
            this.createLesson(data)
            const t = data.date.split('-')
            data.date = new Date(t[0], (t[1] - 1), t[2], 4)
            data.date.setDate(data.date.getDate() + 7)
            data.date = data.date.toISOString()
            data.date = data.date.split('T')[0]
        }
        return data
    }
}

module.exports = new LessonService