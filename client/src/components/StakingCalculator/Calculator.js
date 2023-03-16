import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../..";
import { fetchProjects } from "../../http/projectApi";
import '../StakingCalculator/Calculator.css'

const Calculator = observer(() => {

    useEffect ( () => {
        fetchProjects().then(data => {
            data = data.filter(element => element.reviewed === true)
            project.setProjects(data) //loading data about all projects after page loading
        })
    }, [])

    const {project} = useContext(Context)

    return(

        <div className = "calculator_wrapper">

            <label>Choose your project</label>

            <select>
                {
                    project.projects.map( (projectIterate) => 
                        <option key = {projectIterate.id}> {projectIterate.projectName} </option>
                    )
                }
            </select>

            <div className = "calculator_inputs">
                <label>Days of staking</label>
                <input placeholder = "365" />

                <label> Fee </label>
                <input placeholder = "0.01" />
            </div>

        </div>
    )
})

export default Calculator