const studentService = require("../services/studentService");

class StudentController {

    async createStudent(req, res, next) {
        try {
            const data = req.body;
            const studentData = await studentService.createStudent(data);
            return res.json(studentData);
        } catch (e) {
            next(e);
        }
    }

    async deleteStudent(req, res, next) {
        try {
            const {id} = req.params;
            await studentService.deleteStudent(id);
            return res.json({message: "Ученик удален"});
        } catch (e) {
            next(e);
        }
    }

    async updateStudent(req, res, next) {
        try {
            const {id} = req.params;
            const updatedData = req.body
            await studentService.updateStudent(id, updatedData);
            return res.json({message: "Данные ученика обновлены"});
        } catch (e) {
            next(e);
        }
    }

    async getAllStudents(req, res, next) {
        try {
            const students = await studentService.getAll();
            return res.json(students)

        } catch (e) {
            next(e);
        }
    }

    async getOneStudent(req, res, next) {
        try {
            const {id} = req.params
            const student = await studentService.getOne(id)
            return res.json(student)
        } catch (e) {
            next(e);
        }
    }

}


module.exports = new StudentController()