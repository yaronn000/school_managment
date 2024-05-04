const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')

router.post('/create', adminController.createUser)
router.delete('/delete/:id', adminController.deleteUser)
router.put('/update/:id', adminController.updateUser)

module.exports = router