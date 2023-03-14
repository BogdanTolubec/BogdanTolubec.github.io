import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../..'
import { fetchProjects } from '../../../http/projectApi'
import Project_box from '../ProjectBoxes/Project_box'

const ProjectBoxesArray = observer(({set_Project_box_modal_active}) => {

    const {project} = useContext(Context)
    const {filter} = useContext(Context)

    let filtredByKeywordsProjects = project.projects

    if(filter.state === "education")
    {
        filtredByKeywordsProjects = project.projects.filter(element => element.keywords === "education")
    }

    else if(filter.state === "internet-things")
    {
        filtredByKeywordsProjects = project.projects.filter(element => element.keywords === "internet-things")
    }

    else if(filter.state === "farming system")
    {
        filtredByKeywordsProjects = project.projects.filter(element => element.keywords === "farming system")
    }

    return(
        filtredByKeywordsProjects.map( (projectIterate) => 
            <Project_box className = "Project_box" key = {projectIterate.id} img_scr = {projectIterate.projectIcon}
            set_box_active = {project.setSelectedProject} selectedProject = {projectIterate} set_Project_box_modal_active = {set_Project_box_modal_active}>

                {projectIterate.projectName}

            </Project_box>) //rendering all of our project boxes
    );
})

export default ProjectBoxesArray