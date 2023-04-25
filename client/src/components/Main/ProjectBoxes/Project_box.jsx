import React from 'react';
import './Project_box.css'

const Project_box = ({set_Project_box_modal_active, set_box_active, selectedProject, img_scr, children}) => {

    return(
        <div className='project_wrapper'>

            <div className = 'Project_box' onClick = {() => {set_Project_box_modal_active(true);
                        set_box_active(selectedProject)}}>

                <img src = {img_scr} alt="NO IMG!" title="icon" />

                {selectedProject.reviewed === false ? <p className = 'not_reviewed'>Not reviewed yet</p> 
                : <p className = 'reviewed'>Reviewed</p>}

                <p>{children}</p>

            </div>
        </div>
    );
}

export default Project_box