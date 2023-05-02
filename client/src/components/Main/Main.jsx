import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import './Main.css'
import Project_box_pop_up from './ProjectBoxPopUp/ProjectBoxPopUp';
import ProjectBoxesArray from './ProjectBoxesArray/ProjectBoxesArray';
import { fetchProjects } from '../../http/projectApi';

const Main = observer(() => {

    const [Project_box_modal_active, set_Project_box_modal_active] = useState(false)
    const {project} = useContext(Context)
    const [isListOfProjectEmpty, setIsListOfProjectEmpty] = useState(true)

    useEffect( () => {
        fetchProjects().then(data => {
            
            data = data.filter(element => element.reviewed === true)

            if(data.length !== 0){
                project.setProjects(data) //loading data about all projects after page loading
                project.setSelectedProject(data[0])
                setIsListOfProjectEmpty(false)
            }

            else{
                setIsListOfProjectEmpty(true)
            }
        })
    }, [])

    return(
        <main className='main'>
                {isListOfProjectEmpty === false ? (

                <div className='projects_wrapper'>
                    <ProjectBoxesArray set_Project_box_modal_active={set_Project_box_modal_active} /><Project_box_pop_up setActive={set_Project_box_modal_active} active={Project_box_modal_active} isWatchlist={false}>
                        <div className="wrapper">
                            <div className='project_name'>
                                {project.selectedProject.projectName}
                                <img src={project.selectedProject.projectIcon} alt="no img"></img>
                            </div>

                            <div>
                                {project.selectedProject.description}
                            </div>
                        </div>

                    </Project_box_pop_up>
                </div>) :
                (<div className='projects_wrapper'></div>)
                }
        </main>
    );
}
)

export default Main