import { observer } from "mobx-react-lite";
import React from "react";
import { useState, useEffect, useContext } from "react";
import CreateProjectModal from "../components/Main/AdminModals/ProjectCreateModal";
import jwt_decode from "jwt-decode"
import { Context } from "..";
import { fetchProjects } from "../http/projectApi";
import Project_box_pop_up from "../components/Main/ProjectBoxPopUp/ProjectBoxPopUp";
import CreateEventModal from "../components/Main/AdminModals/CreateEventModal";
import "./PagesStyles/CreateProjectPageStyle.css"
import ProjectBoxesArray from "../components/Main/ProjectBoxesArray/ProjectBoxesArray";

const CreateNewProjectPage = observer(() => {

    const [Project_box_modal_active, set_project_box_modal_active] = useState(false)
    const [Create_event_modal_active, set_create_event_modal_active] = useState(false)
    const [ActiveCreateProjectModal, set_create_project_modal_active] = useState(false)
    const [isListOfProjectEmpty, setIsListOfProjectEmpty] = useState(true)

    const {project} = useContext(Context)

    useEffect ( () => {
        fetchProjects().then(data => {
            
            data = data.filter(element => element.userId === jwt_decode(localStorage.getItem('token')).id)
            
            if(data.length !== 0)
            {
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
        <div className = "main_div">

        {isListOfProjectEmpty === false ? (

            <div className = "projects_wrapper">
                <ProjectBoxesArray set_Project_box_modal_active = {set_project_box_modal_active}/>

                <Project_box_pop_up setActive={set_project_box_modal_active} active = {Project_box_modal_active} isWatchlist = {false}>
                    <div className = "wrapper">
                        <div className='project_name'>
                            {project.selectedProject.projectName}
                            <img src = {project.selectedProject.projectIcon} alt = "no img"></img>
                        </div>

                        <div>
                            {project.selectedProject.description}
                        </div>
                    </div>

                </Project_box_pop_up>
            </div>) : 
            (<div>It's empty here!</div>)}

            <div className = "control_buttons_user">
                <button className = "user_control_button" type="submit" onClick = { () => {
                    set_create_project_modal_active(true)}
                    }> Create project </button>

                <button className = "user_control_button" type="submit" onClick = { () => {
                    set_create_event_modal_active(true)}
                    }> Create event </button>
            </div>

            <CreateProjectModal active = {ActiveCreateProjectModal} setActive = {set_create_project_modal_active}/>
            <CreateEventModal active = {Create_event_modal_active} setActive = {set_create_event_modal_active} />
        </div>
    );
})

export default CreateNewProjectPage