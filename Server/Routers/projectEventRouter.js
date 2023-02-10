const Router = require('express')
const router = Router()
const projectEventController = require('../Controllers/projectEventController')

router.post('/', projectEventController.create)
router.get('/', projectEventController.getAll)
router.get('/:id', projectEventController.getByProject)
router.delete('/:projectName/:eventDate', projectEventController.delete)


module.exports = router