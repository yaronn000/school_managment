const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/create', authMiddleware, adminMiddleware, adminController.createUser)
router.delete('/delete/:id', authMiddleware, adminMiddleware, adminController.deleteUser)
router.put('/update/:id', authMiddleware, adminMiddleware, adminController.updateUser)
router.get('/', authMiddleware, adminMiddleware, adminController.getAllUsers)
router.get('/:id', authMiddleware, adminMiddleware, adminController.getOneUser)

module.exports = router