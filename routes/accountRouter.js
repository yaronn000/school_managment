const Router = require('express')
const router = new Router()
const accountController = require('../controllers/accountController')

router.post('/', accountController.createAccount)
router.get('/', (req, res) => {
    res.json({message: 'uuuuu'})
})

module.exports = router