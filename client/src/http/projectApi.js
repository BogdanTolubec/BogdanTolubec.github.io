import { $host, $authHost } from "./index";

//fetches - for requesting server
//create - add something into DB
//delete - delete object and related to object objects
//$host - every user have access $authHost - only for authorisated users

export const createProject = async (project) => {

    const {data} = await $authHost.post('/api/project', project, {"content-type": false})

    console.log("Data" + JSON.stringify(data))

    return data
}

export const updateReviewStatusOnProject = async (info) => {
    const {data} = await $authHost.post('/api/project/verifyProject', info)

    return data
}

export const fetchProjects = async (projectIcon, projectName, description, tokenPrice, fullTokenSupply, publicVesting, projectStage, realMoneySupply, predictMoneySupply, keywords, userId) => {
    const {data} = await $host.get('/api/project', {params: {
        projectIcon, projectName, description, tokenPrice, fullTokenSupply, publicVesting, projectStage, realMoneySupply, predictMoneySupply, keywords, userId}
    })

    return data
}

export const fetchProjectsByUser = async (userId) => { //find all projects in user's watchlist by user's id
    const {data} = await $authHost.get('/api/project/watchlistProjects/' + userId)

    return data
}

export const fetchProjectsByKeyword = async (keyword) => { //find all projects in user's projects by keyword
    const {data} = await $authHost.get('/api/project//byKeyword/' + keyword)

    return data
}

export const deleteProject = async (projectName) => { //delete project by name

    const {data} = await $authHost.delete('/api/project/' + projectName)

    return data
}

export const createProjectEvent = async (projectEvent) => {

    const {data} = await $authHost.post('/api/projectEvent', projectEvent) //needed projectName, eventDate, tokensPerEvent, moneySupply 

    return data    
}

export const fetchProjectEvents = async (id) => {
    try{
    const {data} = await $host.get('/api/projectEvent/' + id)
    return data
    } catch(e){
        console.log(e)
    }

}

export const deleteProjectEvent = async (deleteInfo) => {
    
    console.log("event deleting info: " + JSON.stringify(deleteInfo))

    try{
        const {data} = await $authHost.delete('/api/projectEvent/' + deleteInfo.projectName + '/' + deleteInfo.eventDate)
    
        return data
        } catch(e){
            alert("Date is empty")
            console.log(e)
        }
}

export const createWatchlistProject = async (watchlistProject) => {

    try{

    const {data} = await $authHost.post('/api/projectWatchlist', watchlistProject) //needed userId && projectId

    return data
    } catch(e){
        alert("May be it is already in your watchlist?")
    } 
}

export const deleteWatchlistProject = async (projectId) => {

    try{
    const {data} = await $authHost.delete('/api/projectWatchlist/' + projectId)

    return data
    } catch(e){
        alert("Not in watchlist")
    } 
}