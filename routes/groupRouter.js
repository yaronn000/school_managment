const Router = require('express')
const router = new Router()
const groupController = require('../controllers/groupController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/create', authMiddleware, adminMiddleware, groupController.createGroup)
router.delete('/delete/:id', authMiddleware, adminMiddleware, groupController.deleteGroup)
router.put('/update/:id', authMiddleware, adminMiddleware, groupController.updateGroup)
router.get('/', authMiddleware, adminMiddleware, groupController.getAllGroups)
router.get('/:id', authMiddleware, adminMiddleware, groupController.getOneGroup)

module.exports = router