const Router = require('express')
const router = Router()
const userController = require('../Controllers/userController')
const authMiddleware = require('../middleware/authMiddleWare')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware ,userController.auth)
router.delete('/', )


module.exports = router