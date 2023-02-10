import React from "react";
import Pop_up_modal from "../../Menu/Authorisation/PopUp";
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Context } from '../../..';
import { createWatchlistProject, deleteWatchlistProject, fetchProjectEvents } from '../../../http/projectApi';
import "./ProjectBoxPopUp.css"
import { useState } from "react";
import jwt_decode from "jwt-decode"

const now = new Date()
const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()

const Project_box_pop_up = observer(({active, setActive, isWatchlist, children}) => { //isWatchlist needed for buuton changes (Add/Delete to/from watchlist) 

    const {project} = useContext(Context)

    const [lastDate, setLastDate] = useState()
    const [nextDate, setNextDate] = useState()
    const [price, setPrice] = useState(0)

    useEffect( () => {
        fetchProjectEvents(project.selectedProject.id || 2).then(data => {
            project.setProjectEvents(data)
            settingLastDate(project.projectEvents)
            settingNextDate(project.projectEvents)
        })
    }, [active])

    const settingLastDate = (events) => { //need this function to set the project last date event and price by last event!

        if(events[0] != undefined){

        let lastDate = 1568978000000 //smaller then every of possible for 1st iteration to do 1st checking = true (date in milliseconds)

        events.map(eventIterate => {
            let millisecondsDate = new Date(eventIterate.eventDate).valueOf()

            if(millisecondsDate <= todayDate && millisecondsDate > lastDate){
                lastDate = millisecondsDate
            }

            lastDate = new Date(lastDate)

            if(lastDate.valueOf() === 1568978000000){
                setLastDate("     XXXX-XX-XX")
                setPrice("Unknown");
            } else {                
                setLastDate(lastDate.toString())
                setPrice(eventIterate.moneySupply / eventIterate.tokensPerEvent); // setting price by last events (money supply / tokens)
            }
        })

    } else {
        setLastDate("     XXXX-XX-XX")
    }
    }

    const settingNextDate = (events) => {

        if(events[0] != undefined){

        let nextDate = 1968978000000

        events.map(eventIterate => {
            let millisecondsDate = new Date(eventIterate.eventDate).valueOf()

            if(millisecondsDate >= todayDate && millisecondsDate < nextDate){
                nextDate = millisecondsDate
            }

            nextDate = new Date(nextDate)

            if(nextDate.valueOf() === 1968978000000){
                setNextDate("     XXXX-XX-XX")
            } else {                
                setNextDate(nextDate.toString())
            }
        })
    } else {
        setNextDate("     XXXX-XX-XX")
    }
    }

    const addToWatchlist = () => {
        createWatchlistProject(
            {userId: (jwt_decode(localStorage.getItem('token'))).id, 
            projectId: project.selectedProject.id})
        //getting from saved in local storage token user's id and project's id from current selected project (set on this after clicking on project box)
    }

    const deleteFromWatchlist = () =>{
        deleteWatchlistProject(project.selectedProject.id).then(window.location.reload())
    }

    return(        
        <Pop_up_modal setActive = {setActive} active = {active}>
            <div className = "project_info_wrapper">
                {children}
                <p>Project last event: {lastDate !== undefined ? lastDate.substring(4,15) : "Loading..."}</p>
                <p>Project next event: {nextDate !== undefined ? nextDate.substring(4,15) : "Loading..."}</p>
                <p>Price: {price}</p>

                {
                    isWatchlist ? <button onClick = {() => {deleteFromWatchlist()}}> Delete from watchlist </button> :
                    <button onClick = {() => {addToWatchlist()}}> Add to a watchlist </button>
                }
            </div>

            <div className='event_calendar'>
                    <h1>Events!</h1>
                    
                        <ol className = "square">
                            {
                        project.projectEvents.map(eventIterate => 
                                <div className="events_wrapper" key = {eventIterate.id}>
                                    <li> Event date = {eventIterate.eventDate.substring(0,10)}      Event tokens count = {eventIterate.tokensPerEvent}    </li>
                                </div>
                        )}
                        </ol>
                    
                </div>

        </Pop_up_modal>
    );
})

export default Project_box_pop_up