import React, { useState } from 'react';
import CreateEventModal from '../components/Main/AdminModals/CreateEventModal';
import DeleteEventModal from '../components/Main/AdminModals/deleteEvent';
import CreateProjectModal from '../components/Main/AdminModals/ProjectCreateModal';
import DeleteProjectModal from '../components/Main/AdminModals/deleteProject';
import './PagesStyles/AdminPageStyle.css'
import UpdateUserRoleModal from '../components/Main/AdminModals/ChangeUserRoleModal/ChangeUserRoleModal';

const AdminPage = () => {
    const [activeCreateProjectModal, setCreateProjectModalActive] = useState(false)
    const [activeDeleteProjectModal, setDeleteProjectModalActive] = useState(false)

    const [activeCreateEventModal, setCreateEventModalActive] = useState(false)
    const [activeDeleteEventModal, setDeleteEventModalActive] = useState(false)

    const [activeUpdateUserRoleModal, setUserRoleModalActive] = useState(false)

    return(
        <div className ='admin_page_wrapper'>
            <button className="closing-button" type = 'submit' onClick = {() => {
            setCreateProjectModalActive(true)}}>
                    Create project
            </button> 

            <button className="closing-button" type = 'submit' onClick = {() => {
            setDeleteProjectModalActive(true)}}>
                    Delete project
            </button>

            <button className="closing-button" type = 'submit' onClick = {() => {
            setCreateEventModalActive(true)}}>
                    Create event
            </button> 

            <button className="closing-button" type = 'submit' onClick = {() => {
            setDeleteEventModalActive(true)}}>
                    Delete event
            </button>

            <button className="closing-button" type = 'submit' onClick = {() => {
            setUserRoleModalActive(true)}}>
                    Update user role
            </button>

            <CreateProjectModal active = {activeCreateProjectModal} setActive = {setCreateProjectModalActive} />
            <DeleteProjectModal active = {activeDeleteProjectModal} setActive = {setDeleteProjectModalActive}/>

            <CreateEventModal active = {activeCreateEventModal} setActive = {setCreateEventModalActive} />
            <DeleteEventModal active = {activeDeleteEventModal} setActive = {setDeleteEventModalActive}/>

            <UpdateUserRoleModal active = {activeUpdateUserRoleModal} setActive = {setUserRoleModalActive}></UpdateUserRoleModal>

        </div>
    )
}

export default AdminPage;