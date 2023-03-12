import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../..'; 
import { observer } from 'mobx-react-lite';
import '../Main/Main.css'
import Project_box_pop_up from '../Main/ProjectBoxPopUp/ProjectBoxPopUp'; 
import { useEffect } from 'react';
import { fetchProjectsByUser } from '../../http/projectApi';
import jwt_decode from 'jwt-decode'
import ProjectBoxesArray from '../Main/ProjectBoxesArray/ProjectBoxesArray';

const Watchlist = observer(() => {
    const [Project_box_modal_active, set_Project_box_modal_active] = useState(false)
    const {project} = useContext(Context)

    useEffect ( () => {
        fetchProjectsByUser(jwt_decode(localStorage.getItem('token')).id).then(data => {
            project.setProjects(data) //loading data about all projects after page loading
        })
    }, [])

    return(
        <main className='main'>
            <div className='projects_wrapper'>

                <ProjectBoxesArray set_Project_box_modal_active = {set_Project_box_modal_active}/>

                <Project_box_pop_up setActive={set_Project_box_modal_active} active = {Project_box_modal_active} isWatchlist = {true}>
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

export default Watchlist