const Router = require('express')
const router = new Router()
const roleRouter = require('./roleRouter')
const authRouter = require('./authRouter')
const adminRouter = require('./adminRouter')
const groupRouter = require('./groupRouter')
const studentRouter = require('./studentRouter')
const lessonRouter = require('./lessonRouter')
const reportRouter = require('./reportRouter')

router.use('/role', roleRouter)
router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/group', groupRouter)
router.use('/student', studentRouter)
router.use('/lesson', lessonRouter)
router.use('/report', reportRouter)

module.exports = router