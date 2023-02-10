const {ProjectEvent, EventCalendar, Project} = require('../models/models')
const ApiError = require('../errors/apiErrors')
const projectController = require('./projectController')
const { DATE, DATEONLY } = require('sequelize')

class projectEventController {
    async create(req, res, next){
        try{
            const {projectName, eventDate, tokensPerEvent, moneySupply} = req.body

            const {id} = await Project.findOne(
                {where: {projectName: projectName}}
            )

            const {calendarId} = await EventCalendar.findOne({where: {projectId: id}})

            const projectEvent = await ProjectEvent.create({eventDate: eventDate, tokensPerEvent: tokensPerEvent, moneySupply: moneySupply, eventCalendarCalendarId: calendarId})

            return res.json(projectEvent)
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        const projectEvents = await ProjectEvent.findAll()
        return res.json(projectEvents)
    }

    async getByProject(req,res, next){
        try{
        const {id} = req.params
        const {calendarId} = await EventCalendar.findOne({where: {projectId: id}})
        const eventByProject = await ProjectEvent.findAll({where: {eventCalendarCalendarId: calendarId}})
        return res.json(eventByProject)
    } catch(e){
        next(ApiError.badRequest("Error: " + e))
    }
    }

    async delete(req, res, next){
        try{
        const {projectName, eventDate} = req.params
        const {id} = await Project.findOne({where: {projectName: projectName}})

        const {calendarId} = await EventCalendar.findOne({where: {projectId: id}})

        const report = await ProjectEvent.destroy({where: {eventCalendarCalendarId: calendarId, eventDate: eventDate}})

        return res.json(report)

        } catch (e){
            next(ApiError.badRequest(e + "     params " + JSON.stringify(req.params)))
        }
    }
}

module.exports = new projectEventController()