import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import "../Main/Main.css"
import Project_box_pop_up from '../Main/ProjectBoxPopUp/ProjectBoxPopUp'
import { fetchProjects, updateReviewStatusOnProject } from '../../http/projectApi'
import ProjectBoxesArray from '../Main/ProjectBoxesArray/ProjectBoxesArray'

const ReviewForm = observer(() => {
    const [Project_box_modal_active, set_Project_box_modal_active] = useState(false)
    const {project} = useContext(Context)
    const [isListOfProjectEmpty, setIsListOfProjectsEmpty] = useState()

    useEffect ( () => {
        fetchProjects().then(data => {
            if(data.length !== 0){
                setIsListOfProjectsEmpty(false)
                data = data.filter(element => element.reviewed == false)
                project.setProjects(data) //loading data about all projects after page loading
            }
            else{
                setIsListOfProjectsEmpty(true)
            }
        })
    }, [])

    return(
        <main className='main'>
            <div className='projects_wrapper'>

            {isListOfProjectEmpty === false ? (

                <><ProjectBoxesArray set_Project_box_modal_active={set_Project_box_modal_active} /><Project_box_pop_up setActive={set_Project_box_modal_active} active={Project_box_modal_active} isWatchlist={false}>
                        <div className="wrapper">
                            <div className='project_name'>
                                {project?.selectedProject?.projectName}
                                <img src={project?.selectedProject?.projectIcon} alt="no img"></img>
                            </div>

                            <div>
                                {project?.selectedProject?.description}

                                <button onClick={() => {
                                    const info = { id: project?.selectedProject?.id, status: 1 }

                                    updateReviewStatusOnProject(info).
                                        then(window.location.reload())
                                } }> Verify </button>
                            </div>
                        </div>

                    </Project_box_pop_up></>) :
                    <div></div>}
            </div>
        </main>
    );
}
)

export default ReviewForm