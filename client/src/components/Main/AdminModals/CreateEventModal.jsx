import { observer } from 'mobx-react-lite';
import react, {useState} from 'react'
import { useContext } from 'react';
import { Context } from '../../..';
import { createProjectEvent} from '../../../http/projectApi';
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

    function isProjectLegal(project, projectName){

        var isProjectLegal = false;

        project.projects.map( (projectIterate) => {
            if(projectIterate.projectName === projectName){
                isProjectLegal = true;
            }
        })

        return isProjectLegal
    }

    const addProjectEvent = () => {
        if(isProjectLegal(project, projectName)){

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
            } 
            
            catch (e){
                alert(e)
                inputsClear(inputs)
        }
    }

    else {
        alert("It's not your project to change!")
    }

    }

    return(
        <Pop_up_modal active = {active} setActive = {setActive}>
            <div className = 'wrapper'>

                <label> Project name: </label>
                <input type = {"text"} className='inputs' onChange = {(e) => {setProjectName(e.target.value)}} placeholder = 'Bitcoin'/>

                <label> eventDate: </label>
                <input type = 'date' className='inputs' onChange = {(e) => {setEventDate(e.target.value)}} placeholder = {todayDate}/>

                <label> Tokens per event: </label>
                <input type = {'number'} className='inputs' min = {1} onChange = {(e) => {setTokensPerEvent(e.target.value)}} placeholder = '100'/>

                <label> Money supply(for event): </label>
                <input type = {"number"} className='inputs' min = {0.01} onChange = {(e) => {setMoneySupply(e.target.value)}} placeholder = '1000'/>

                <button id = 'add' onClick={() => {addProjectEvent()}}> Create event </button>
            </div>
        </Pop_up_modal>
    );
})

export default CreateEventModal