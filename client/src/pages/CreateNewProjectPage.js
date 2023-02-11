import React from "react";
import { useState } from "react";
import CreateProjectModal from "../components/Main/AdminModals/ProjectCreateModal";

const CreateNewProjectPage = () => {

    const [activeCreateProjectModal, setCreateProjectModalActive] = useState(false)

    return(
        <div>
            <button type="submit" onClick = { () => {
                setCreateProjectModalActive(true)}
                }> Create project </button>

            <CreateProjectModal active = {activeCreateProjectModal} setActive = {setCreateProjectModalActive}/>
        </div>
    );
}

export default CreateNewProjectPage