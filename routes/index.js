const Router = require('express')
const router = new Router()
const roleRouter = require('./roleRouter')
const authRouter = require('./authRouter')

router.use('/role', roleRouter)
router.use('/auth', authRouter)

module.exports = router