const {WatchlistProject, Watchlist} = require('../models/models')
const ApiError = require('../errors/apiErrors')

class watchlistProjectController {
    async create(req, res, next){
        try{
            const {userId, projectId} = req.body
            const {id} = await Watchlist.findOne({where: {userId: userId}})

            const isExists = await WatchlistProject.findAll({where: {watchlistId: id, projectId: projectId}})

            if(isExists[0] == undefined){
                const watchlistProject = await WatchlistProject.create({watchlistId: id, projectId: projectId})
                return res.json(watchlistProject)
            } else {
                next(ApiError.badRequest("Already in watchlist!"))
            }

        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res){
        const {id} = req.params
        const report = await WatchlistProject.destroy({where: {projectId: id}})

        return res.json(report)
    }
}

module.exports = new watchlistProjectController()