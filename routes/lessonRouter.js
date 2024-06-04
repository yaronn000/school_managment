const Router = require('express')
const router = new Router()
const lessonController = require('../controllers/lessonController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/create', authMiddleware, adminMiddleware, lessonController.createLesson)
router.delete('/delete/:id', authMiddleware, adminMiddleware, lessonController.deleteLesson)
router.put('/update/:id', authMiddleware, adminMiddleware, lessonController.updateLesson)
router.get('/:id', authMiddleware, adminMiddleware, lessonController.getAllLessonsForTeacher)
router.post('/make', authMiddleware, adminMiddleware, lessonController.makeLessons)


module.exports = router