const Router = require('express')
const router = new Router()
const roleRouter = require('./roleRouter')
const authRouter = require('./authRouter')
const adminRouter = require('./adminRouter')

router.use('/role', roleRouter)
router.use('/auth', authRouter)
router.use('/admin', adminRouter)

module.exports = router