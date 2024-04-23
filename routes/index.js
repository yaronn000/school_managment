const Router = require('express')
const router = new Router()
const roleRouter = require('./roleRouter')
const accountRouter = require('./accountRouter')

router.use('/role', roleRouter)
router.use('/account', accountRouter)

module.exports = router