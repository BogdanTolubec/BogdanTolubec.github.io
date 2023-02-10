const Router = require('express')
const router = Router()
const watchlistProjectController = require("../Controllers/projectWatchlistController")

router.post('/', watchlistProjectController.create)
router.delete('/:id', watchlistProjectController.delete)


module.exports = router