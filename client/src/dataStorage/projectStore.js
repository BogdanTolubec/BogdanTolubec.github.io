import{ makeAutoObservable } from 'mobx'

export default class projectStore {
        constructor() {
        this._projectEvents = []
        this._projects = []

        this._selectedProject = {}

        this._currentEvent = ""
        this._nextEventDate = ""
        this._lastEventDate = ""

        makeAutoObservable(this)
    }

    setCurrentEvent(currentEvent){
        this._currentEvent = currentEvent
    }

    setNextEventDate(nextEventDate){
        this._nextEventDate = nextEventDate
    }

    setLastEventDate(lastEventDate){
        this._lastEventDate = lastEventDate
    }

    setProjectEvents(event){
        this._projectEvents = event;
    }

    setProjects(project){
        this._projects = project;
    }

    setSelectedProject = (selectedProject) => {
        this._selectedProject = selectedProject;
    }

    get projectEvents(){
        return this._projectEvents;
    }

    get projects(){
        return this._projects;
    }

    get selectedProject(){
        return this._selectedProject;
    }

    get currentEvent(){
        return this._currentEvent
    }

    get nextEventDate(){
        return this._nextEventDate
    }

    get lastEventDate(){
        return this._lastEventDate
    }
}