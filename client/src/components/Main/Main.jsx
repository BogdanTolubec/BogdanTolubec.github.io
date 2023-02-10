import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import './Main.css'
import Project_box from './ProjectBoxes/Project_box';
import Project_box_pop_up from './ProjectBoxPopUp/ProjectBoxPopUp';
import { useEffect } from 'react';
import { fetchProjects } from '../../http/projectApi';

const Main = observer(() => {
    const [Project_box_modal_active, set_Project_box_modal_active] = useState(false)
    const {project} = useContext(Context)

    useEffect ( () => {
        fetchProjects().then(data => {
            data = data.filter(element => element.reviewed === true)
            project.setProjects(data) //loading data about all projects after page loading
        })
    }, [])

    return(
        <main className='main'>
            <div className='projects_wrapper'>

                {   project.projects.map( (projectIterate) => 
                    <Project_box key = {projectIterate.id} img_scr = {projectIterate.projectIcon}
                    set_box_active = {project.setSelectedProject} selectedProject = {projectIterate} set_Project_box_modal_active = {set_Project_box_modal_active}>

                        {projectIterate.projectName}

                    </Project_box>) //rendering all of our project boxes
                }

                <Project_box_pop_up setActive={set_Project_box_modal_active} active = {Project_box_modal_active} isWatchlist = {false}>
                    <div className = "wrapper">
                        <div className='project_name'>
                            {project.selectedProject.projectName}
                            <img src = {project.selectedProject.projectIcon} alt = "no img"></img>
                        </div>

                        <div>
                            {project.selectedProject.description}
                        </div>
                    </div>

                </Project_box_pop_up>{/*project box popup from all project info*/}
            </div>
        </main>
    );
}
)

export default Main