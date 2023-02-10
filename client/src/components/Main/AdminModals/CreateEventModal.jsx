import { observer } from 'mobx-react-lite';
import react, {useState} from 'react'
import { useContext } from 'react';
import { Context } from '../../..';
import { createProjectEvent, fetchEventCalendar, fetchProjectByName, fetchUpdateProject } from '../../../http/projectApi';
import Pop_up_modal from '../../Menu/Authorisation/PopUp';
import { inputsClear } from './clearFunction';
import './CreateEventModal.css'

const inputs = document.getElementsByClassName('inputs')

const CreateEventModal = observer(({active, setActive}) => {

    let todayDate = new Date()
    todayDate =  Date(todayDate.getFullYear() + "-" + todayDate.getMonth() + "-" + todayDate.getDate())

    const {project} = useContext(Context)

    const [projectName, setProjectName] = useState()
    const [eventDate, setEventDate] = useState()
    const [tokensPerEvent, setTokensPerEvent] = useState()
    const [moneySupply, setMoneySupply] = useState()
    const [idCalendar,setidCalendar] = useState()

    const addProject = () => {

        try{
        let formData = {
        projectName: projectName,
        eventDate: eventDate,
        tokensPerEvent: tokensPerEvent,
        moneySupply: moneySupply,
        eventCalendarCalendarId: idCalendar
        }

        console.log("after form data: " + JSON.stringify(formData))

        createProjectEvent(formData).then(() => {
            alert("Success")
            setProjectName('')
            setEventDate('')
            setTokensPerEvent(0)
            setMoneySupply(0)
            setidCalendar(0)
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
                <input className='inputs' type = 'date' onChange = {(e) => {setEventDate(e.target.value)}} placeholder = {todayDate}></input>

                <label> Tokens per event: </label>
                <input className='inputs' onChange = {(e) => {setTokensPerEvent(e.target.value)}} placeholder = '100'></input>

                <label> Money supply(for event): </label>
                <input className='inputs' onChange = {(e) => {setMoneySupply(e.target.value)}} placeholder = '1000'></input>


                <button id = 'add' onClick={() => {addProject()}}> Create event </button>
            </div>
        </Pop_up_modal>
    );
})

export default CreateEventModal