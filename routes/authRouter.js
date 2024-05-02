const Router = require('express')
const router = new Router()
const accountController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', accountController.createAccount)
router.post('/login', accountController.login)
router.post('/refresh', accountController.refresh)
router.delete('/logout', authMiddleware, accountController.logout)
router.get('/:id', authMiddleware, accountController.getInformation)


module.exports = router