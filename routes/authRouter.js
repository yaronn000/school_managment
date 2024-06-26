const Router = require('express')
const router = new Router()
const accountController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', accountController.login)
router.get('/refresh', accountController.refresh)
router.post('/logout', authMiddleware, accountController.logout)
router.get('/me', authMiddleware, accountController.getInformation)


module.exports = router