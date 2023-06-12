import { observer } from 'mobx-react-lite';
import react, {useState} from 'react'
import { createProject } from '../../../http/projectApi';
import Pop_up_modal from '../../Menu/Authorisation/PopUp';
import { inputsClear } from './clearFunction';
import './ProjectCreateModal.css'
import jwt_decode from 'jwt-decode'

const inputs = document.getElementsByClassName('project_inputs')

const CreateProjectModal = observer(({active, setActive}) => {

    let todayDate = new Date()
    todayDate =  todayDate.getFullYear() + "-" + todayDate.getMonth() + "-" + todayDate.getDate()

    const [icon, setIcon] = useState('https://st4.depositphotos.com/10376142/27856/v/600/depositphotos_278561428-stock-illustration-black-blockchain-technology-icon-isolated.jpg')
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [tokenPrice, setTokenPrice] = useState()
    const [fullTokenSupply, setFullTokenSupply] = useState()
    const [publicVesting, setPublicVesting] = useState()
    const [projectStage, setProjectStage] = useState('Close')
    const [realMoneySupply, setRealMoneySupply] = useState()
    const [predictMoneySupply, setPredictMoneySupply] = useState()
    const [keywords, setKeyWords] = useState("education")
    const [stakingPercent, setStakingPercent] = useState()
    const [presentation, setPresentation] = useState()
    const userId = (jwt_decode(localStorage.getItem('token')).id)

    const addProject = () => {

        try{

        const formData = new FormData()
        formData.append("projectIcon",icon)
        formData.append("projectName",name)
        formData.append("description",description)
        formData.append("tokenPrice",tokenPrice)
        formData.append("fullTokenSupply",fullTokenSupply)
        formData.append("publicVesting",publicVesting.toLocaleString('ru-RU').replace('.', '-s'))
        formData.append("projectStage",projectStage)
        formData.append("realMoneySupply",realMoneySupply)
        formData.append("predictMoneySupply",predictMoneySupply)
        formData.append("keywords",keywords)
        formData.append("userId",userId)
        formData.append("stakingPercent",stakingPercent)
        formData.append("presentation",presentation)

        console.log("File: " + JSON.stringify(presentation))

        createProject(formData).then(alert("Success")).then(() => {
            setIcon('')
            setName('')
            setDescription('')
            setTokenPrice('')
            setFullTokenSupply('')
            setPublicVesting('')
            setProjectStage('')
            setRealMoneySupply('')
            setPredictMoneySupply('')
            setKeyWords('')
            setStakingPercent('')
        })

        inputsClear(inputs)
        } catch (e) {
            alert("Something went wrong...")
            console.log(e)
        }

    }

    return(
        <Pop_up_modal active = {active} setActive = {setActive}>
            <div className = 'create_project_wrapper'>
                <label> Project icon(url-path): </label>
                <input type = {"url"} className = 'project_inputs' 
                onChange = {(e) => {setIcon(e.target.value)}} placeholder = 'niceimage/img.jpg'/>

                <label> Project name(255 symbols max): </label>
                <input type = {"text"} className = 'project_inputs' 
                onChange = {(e) => {setName(e.target.value)}} placeholder = 'Cryptocoin'/>

                <label> Description (some words about project): </label>
                <input type = {"text"} className = 'project_inputs' 
                onChange = {(e) => {setDescription(e.target.value)}} placeholder = 'It`s a project for...'/>

                <label> Token tokenPrice: </label> {/*Shold be calculated later*/} 
                <input type = {"number"} className = 'project_inputs' 
                onChange = {(e) => {setTokenPrice(Number(e.target.value))}} placeholder = '10'/>

                <label> Full token supply: </label>
                <input type = {"number"} className = 'project_inputs' 
                onChange = {(e) => {setFullTokenSupply(Number(e.target.value))}} placeholder = '10000'/>

                <label> Keywords: </label>
                <select className = 'project_inputs' 
                onChange = {(e) => {setKeyWords(e.target.value)}} placeholder = 'education/internet-things/farming-system'>
                    <option> education </option>
                    <option> farming system </option>
                    <option> internet-things </option>
                </select>

                <label> Public vesting (After today's date!!): </label>
                <input className = 'project_inputs' type='date' placeholder = '2023.01.28' min = {toString(todayDate)}
                onChange = {(e) => {setPublicVesting(e.target.value)}}/>

                <label> Real money supply (just really real): </label>
                <input type = {"number"} className = 'project_inputs' 
                onChange = {(e) => {setRealMoneySupply(Number(e.target.value))}} placeholder = '1000'/>

                <label> Staking reward(percent): </label>
                <input type = {"number"} step = {0.01} className = 'project_inputs' 
                onChange = {(e) => {setStakingPercent(Number(e.target.value))}} placeholder = '0.05'/>

                <label> Predict on money supply: </label>
                <input type = {"number"} className = 'project_inputs' 
                onChange = {(e) => {setPredictMoneySupply(Number(e.target.value))}} placeholder = '2000'/>

                <label>Presentation</label>
                <input type = "file" accept = '.pptx' name = "presentation" 
                onChange = { (e) => {setPresentation(e.target.files[0]); console.log(e.target.files[0])} }/>

                <button type = 'submit' onClick={() => {addProject()}}> Create project </button>
            </div>
        </Pop_up_modal>
    );
})

export default CreateProjectModal