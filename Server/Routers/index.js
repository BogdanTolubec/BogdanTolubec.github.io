const Router = require('express')
const router = Router()
const userRouter = require('./userRouter')
const projectEventRouter = require('./projectEventRouter')
const projectRouter = require('./projectRouter')
const projectWatchlistRouter = require('./projectWatchlistRouter')

router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/projectEvent', projectEventRouter)
router.use('/projectWatchlist', projectWatchlistRouter)

module.exports = router