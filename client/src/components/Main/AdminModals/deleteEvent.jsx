import { observer } from 'mobx-react-lite';
import react, {useState} from 'react'
import { useContext } from 'react';
import { Context } from '../../..';
import { createProjectEvent, deleteProjectEvent, fetchEventCalendar, fetchProjectByName, fetchUpdateProject } from '../../../http/projectApi';
import Pop_up_modal from '../../Menu/Authorisation/PopUp';
import { inputsClear } from './clearFunction';
import './CreateEventModal.css'

const inputs = document.getElementsByClassName('inputs')

const DeleteEventModal = observer(({active, setActive}) => {

    const {project} = useContext(Context)

    const [projectName, setProjectName] = useState()
    const [eventDate, setEventDate] = useState()

    const deleteEvent = () => {

        try{
        let formData = {
        projectName: projectName,
        eventDate: eventDate
        }

        console.log(formData)

        deleteProjectEvent(formData).then(() => {
            alert("Success")
            setProjectName('')
            setEventDate('')
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
                <input className='inputs' onChange = {(e) => {setProjectName(e.target.value)}} placeholder = 'Bitcoin'></input>

                <label> eventDate: </label>
                <input className='inputs' type = 'date' onChange = {(e) => {setEventDate(e.target.value)}} placeholder = {"2022-01-01"}></input>

                <button id = 'add' onClick={() => {deleteEvent()}}> Delete event </button>
            </div>
        </Pop_up_modal>
    );
})

export default DeleteEventModal