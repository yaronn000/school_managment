const Router = require('express')
const router = new Router()
const roleController = require('../controllers/roleController')

router.post('/', roleController.createRole)
router.get('/', roleController.getAll)

module.exports = router