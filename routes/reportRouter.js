const Router = require('express')
const router = new Router()
const reportController = require('../controllers/reportController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/create', authMiddleware, reportController.createReport)
router.get('/:id', authMiddleware, reportController.getOneReport)



module.exports = router