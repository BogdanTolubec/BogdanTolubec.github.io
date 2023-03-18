import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Context } from "../..";
import { fetchProjects } from "../../http/projectApi";
import '../StakingCalculator/Calculator.css'

const Calculator = observer(() => {

    const {project} = useContext(Context)

    const [projectName, setProjectName] = useState(document.getElementById("calculator_project_select")?.value)
    const [daysOfStaking, setDaysOfStaking] = useState(365)
    const [fees, setFees] = useState(0.01)
    const [tokenPrice, setTokenPrice] = useState(project.selectedProject?.tokenPrice)
    const [money_amount, setMoneyAmount] = useState(10000)
    const [income, setIncome] = useState(0)
    const [stakingPercent, setStakingPercent] = useState(0)

    useLayoutEffect (() => {
        fetchProjects().then(data => {
            data = data.filter(element => element.reviewed === true)
            data = data.filter(element => element.stakingPercent !== 0)
            project.setProjects(data) //loading data about all projects after page loading

            project.setSelectedProject(data[0])
        })
    }, [])

    useEffect (() => {
        setIncome(calculateIncome())
        console.log("Project name: " + projectName + " money amount: " + money_amount + " fees: " + fees + " token price: " + tokenPrice + " days of staking: " + daysOfStaking + " Income: " + income + " selected project.stakingPercent = " + JSON.stringify(project.selectedProject))
    },[money_amount, fees, tokenPrice, daysOfStaking, projectName, income, project.selectedProject])

    function calculateIncome(){
    let result = (daysOfStaking/365) * (money_amount * stakingPercent - money_amount*fees)
    let priceDeltaPercent = (project.selectedProject.tokenPrice - tokenPrice) / tokenPrice

    return  (tokenPrice === project.selectedProject.tokenPrice) ? (result): (result - (result * priceDeltaPercent))
    }


    return(
        <div className = "calculator_wrapper">

            <label>Choose your project</label>

            <select id = "calculator_project_select" 
                onChange = {(e) => {setProjectName(e.target.value);
                    project.setSelectedProject(project.projects.filter(project => project.projectName === e.target.value)[0]);
                    setTokenPrice(project.selectedProject.tokenPrice)
                    setStakingPercent(project.selectedProject.stakingPercent)
                }}>

                {
                    project.projects.map( (projectIterate) => 
                        <option key = {projectIterate.id}> {projectIterate.projectName} </option>
                    )
                }
            </select>

            <div className = "calculator_lables">
                <label> Days of staking </label>

                <label> Fees </label>

                <label> Token price </label>
            </div>

            <div className = "calculator_inputs">
                <input type = {"number"} min = {0} placeholder = "365" onChange = {(e) => {setDaysOfStaking(e.target.value)}}/>

                <input type = {"number"} step = {0.01} max = {1} min = {0} placeholder = "0.01" onChange = {(e) => {setFees(e.target.value)}}/>

                <input type = {"number"} min = {0} placeholder = "0.01$" onChange = {(e) => {setTokenPrice(e.target.value)}}/>
            </div>

            <label className = "money_amount_lable"> Money amount </label>
            <input type = {"number"} min = {0} className = "money_amount_input" placeholder = "10000$" onChange = {(e) => {setMoneyAmount(e.target.value)}}/>

            <div defaultValue = {0} className = "calculator_outputs">
                <output> Income: {isNaN(income) ? 0 : income}$ </output>
            </div>

        </div>
    )
})

export default Calculator