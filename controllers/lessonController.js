const lessonService = require("../services/lessonService");

class LessonController {

    async createLesson(req, res, next) {
        try {
            const data = req.body;
            const lessonData = await lessonService.createLesson(data);
            return res.json(lessonData);
        } catch (e) {
            next(e);
        }
    }

    async deleteLesson(req, res, next) {
        try {
            const {id} = req.params;
            await lessonService.deleteLesson(id);
            return res.json({message: "Урок удален"});
        } catch (e) {
            next(e);
        }
    }

    async updateLesson(req, res, next) {
        try {
            const {id} = req.params;
            const updatedData = req.body
            await lessonService.updateLesson(id, updatedData);
            return res.json({message: "Данные урока обновлены"});
        } catch (e) {
            next(e);
        }
    }

    async getAllLessonsForTeacher(req, res, next) {
        try {
            const {id} = req.params;
            const date = req.query.date
            const lessons = await lessonService.getAllForTeacher(id, date);
            return res.json(lessons)
        } catch (e) {
            next(e);
        }
    }

    async makeLessons(req, res, next) {
        try {
            const data = req.body;
            const count = req.query.count
            const lessonData = await lessonService.makeLessons(data, count);
            return res.json(lessonData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new LessonController()