const Student = require('../models/student')
const studentInfo = require("../dtos/studentDto")
const db = require('../models')

class StudentService {

    async createStudent(userData) {
        let {surname, name, patronymic, manager, groupId} = userData
        const student = await Student.create({surname, name, patronymic, manager, groupId})
        return student
    }

    async deleteStudent(id) {
        const student = await Student.destroy({where: {id}})
        return id
    }

    async updateStudent(id, data) {
        let {surname, name, patronymic, manager, groupId} = data
        const student = await Student.update({surname, name, patronymic, manager, groupId}, {where: {id}})
        return id
    }

    async getAll() {
        const students = await Student.findAll({include: [{model: db.Account}, {model: db.Group}]})
        for (let i = 0; i < students.length; i++) {
            students[i] = new studentInfo(students[i])
          }
        return students
    }

    async getOne(id) {
        let student = await Student.findOne({where: {id}, include: [{model: db.Account}, {model: db.Group}]})
        student = new studentInfo(student)
        return student
    }

}


module.exports = new StudentService