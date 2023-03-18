import { observer } from 'mobx-react-lite';
import react, {useState} from 'react'
import { deleteProject} from '../../../http/projectApi';
import Pop_up_modal from '../../Menu/Authorisation/PopUp';
import { inputsClear } from './clearFunction';
import './CreateEventModal.css'

const inputs = document.getElementsByClassName('inputs')

const DeleteProjectModal = observer(({active, setActive}) => {

    const [projectName, setProjectName] = useState()

    const deleteProjectOnButtonClick = () => {

        try{
        deleteProject(projectName).then(() => {
            alert("Success")
            setProjectName('')
            window.location.reload()
        })

        inputsClear(inputs)
        } catch (e){
        alert(e)
        inputsClear(inputs)
    }
    }

    return(
        <Pop_up_modal active = {active} setActive = {setActive}>
            <div className = 'wrapper'>

                <label> Project name: </label>
                <input type = {"text"} className='inputs' onChange = {(e) => {setProjectName(e.target.value)}} placeholder = 'Bitcoin'/>

                <button id = 'add' onClick={() => {deleteProjectOnButtonClick()}}> Delete project </button>
            </div>
        </Pop_up_modal>
    );
})

export default DeleteProjectModal