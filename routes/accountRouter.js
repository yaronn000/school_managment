const Router = require('express')
const router = new Router()
const accountController = require('../controllers/accountController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', accountController.createAccount)
router.post('/login', accountController.login)
router.get('/:id', authMiddleware, accountController.getInformation)


module.exports = router