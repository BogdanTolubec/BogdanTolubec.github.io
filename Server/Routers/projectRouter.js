const Router = require('express')
const router = Router()
const projectController = require("../Controllers/projectController")
const checkRoleMiddleware = require('../middleware/roleCheckingMiddleware')
const fileUploadMiddleware = require('../middleware/uploadMiddleware')

router.post('/', fileUploadMiddleware.single('presentation'), projectController.create)
router.post('/verifyProject', checkRoleMiddleware('REVIEWER'), projectController.setProjectReviewedStatus) //Admin has no limits in access
router.get('/', projectController.getAll)
router.get('/:id', projectController.getOne)
router.get('/watchlistProjects/:userId', projectController.getByUser)
router.get('/byKeyword/:keyword', projectController.getByKeyword)
router.delete('/:projectName', projectController.delete)


module.exports = router