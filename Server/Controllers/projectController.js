const {Project, EventCalendar, Watchlist, WatchlistProject, ProjectEvent} = require('../models/models')
const ApiError = require('../errors/apiErrors')
const jwt = require('jsonwebtoken')

class projectController {
    async create(req, res, next){
        try{

            if(req.file == undefined){
                next(ApiError.badRequest("File not found"))
            }

            const presentation = req.file.path

            const {projectIcon, projectName, description, tokenPrice, fullTokenSupply,  publicVesting, projectStage,
                realMoneySupply, predictMoneySupply, keywords, userId, stakingPercent} = req.body       

            const project = await Project.create({projectIcon, projectName, description, tokenPrice, 
                fullTokenSupply, publicVesting, projectStage, realMoneySupply, predictMoneySupply, keywords, stakingPercent,userId, presentation})

            const calendar = await EventCalendar.create({projectId: project.id})

            return res.json(project)
        } 
        
        catch(e){
            next(ApiError.badRequest(req.file.path))
        }
    }

    async setProjectReviewedStatus(req, res, next){
        try{
            const {id, status} = req.body

            const result = await Project.update({reviewed: status}, {where: {id: id}})

            return res.json(result)
        } 
        
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        const projects = await Project.findAll()
        return res.json(projects)
    }

    async getByUser(req,res, next){
        try{
        const {userId} = req.params
        const {id} = await Watchlist.findOne({where: {userId: userId}})
        const projectId = await WatchlistProject.findAll({where: {watchlistId: id}})

        let projects = []

        for(let i = 0; i < projectId.length; i++){
            projects.push(await Project.findOne({where: {id: projectId[i].projectId}}))
        }

        return res.json(projects)
    } catch (e){
        next(ApiError.badRequest(e.message))
    }
    }

    async getByKeyword(req,res, next){
        try{
        const {keyword} = req.params
        const projects = await Project.findAll({where: {keywords: keyword, reviewed: 0}})

        return res.json(projects)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res){
        const {id} = req.params
        const projectOne = await Project.findOne(
            {where: {id}}
        ) 
        return res.json(projectOne)
    }

    async delete(req, res){
        try{
            const {projectName} = req.params
            const {id} = await Project.findOne({where: {projectName: projectName}})

            const {calendarId} = await EventCalendar.findOne({where: {projectId: id}})

            await ProjectEvent.destroy({where: {eventCalendarCalendarId: calendarId}})

            await WatchlistProject.destroy({where: {projectId: id}})

            await EventCalendar.destroy({where: {calendarId: calendarId}})

            await Project.destroy({where: {id: id}})

            return res.json("All Done")
            } catch(e){
            return res.json(e)
        }
    }
}

module.exports = new projectController()