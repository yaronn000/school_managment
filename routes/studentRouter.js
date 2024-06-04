const Router = require('express')
const router = new Router()
const studentController = require('../controllers/studentController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/create', authMiddleware, adminMiddleware, studentController.createStudent)
router.delete('/delete/:id', authMiddleware, adminMiddleware, studentController.deleteStudent)
router.put('/update/:id', authMiddleware, adminMiddleware, studentController.updateStudent)
router.get('/', authMiddleware, adminMiddleware, studentController.getAllStudents)
router.get('/:id', authMiddleware, adminMiddleware, studentController.getOneStudent)

module.exports = router