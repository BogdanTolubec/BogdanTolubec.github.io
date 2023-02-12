const sequelize = require('../dbConnector')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:{type: DataTypes.STRING, unique: true},
    password:{type: DataTypes.STRING, allowNull:false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Watchlist = sequelize.define('watchlist', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const WatchlistProject = sequelize.define('watchlist_project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    projectIcon: {type: DataTypes.STRING, defaultValue: "https://st4.depositphotos.com/10376142/27856/v/600/depositphotos_278561428-stock-illustration-black-blockchain-technology-icon-isolated.jpg"},
    projectName: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    tokenPrice: {type: DataTypes.FLOAT, allowNull: false},
    fullTokenSupply: {type: DataTypes.INTEGER, allowNull: false},
    sharedTokenSupply: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    publicVesting: {type: DataTypes.DATEONLY, allowNull: false},
    projectStage: {type: DataTypes.STRING, allowNull: false},
    realMoneySupply: {type: DataTypes.INTEGER, allowNull: false},
    predictMoneySupply: {type: DataTypes.INTEGER, allowNull: false},
    keywords: {type: DataTypes.STRING, allowNull: false},
    reviewed: {type: DataTypes.BOOLEAN, defaultValue: 0},
    //presentation: {type: DataTypes.}
})

const EventCalendar = sequelize.define('event_calendar', {
    calendarId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const ProjectEvent = sequelize.define('project_event', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    eventDate: {type: DataTypes.DATEONLY, unique: true, allowNull: false},
    tokensPerEvent: {type: DataTypes.INTEGER, allowNull: false},
    moneySupply: {type: DataTypes.INTEGER, allowNull: false}
})

User.hasOne(Watchlist)
Watchlist.belongsTo(User)


User.hasMany(Project)
Project.belongsTo(User)

Watchlist.hasMany(WatchlistProject)
WatchlistProject.belongsTo(Watchlist)

Project.hasMany(WatchlistProject)
WatchlistProject.belongsTo(Project)

EventCalendar.hasMany(ProjectEvent)
ProjectEvent.belongsTo(EventCalendar)

Project.hasOne(EventCalendar)
EventCalendar.belongsTo(Project)

module.exports = {
    User,
    Watchlist,
    WatchlistProject,
    ProjectEvent,
    EventCalendar,
    Project,
}