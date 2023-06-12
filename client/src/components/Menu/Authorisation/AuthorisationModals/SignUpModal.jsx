import React from 'react'
import '../AuthorisationModalsStyles/AuthorisationModalsStyles.css'
import Pop_up_modal from '../PopUp'
import { useState } from 'react'

function Sign_up_modal({setActive, active, setSignUp}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('USER')

    return(
        <Pop_up_modal setActive={setActive} active = {active}>
            <div className = 'authorisation_modal_wrapper'>
                <p>Sign Up</p>
                
                <label>Email</label>

                <div className = 'text-field__icon text-field__icon_email'>
                    <input type = {"email"} placeholder='John228@gmail.com' value = {email} onChange = {(e) => {setEmail(e.target.value)}}/>
                </div>

                <label>Password</label>

                <div className = 'text-field__icon text-field__icon_password'>
                    <input type = "password" placeholder='********' value = {password} onChange = {(e) => {setPassword(e.target.value)} }/>
                </div>

                <label>Choose your role</label>
                
                <select className = 'role_choose' onChange = {(e) => {setRole(e.target.value)}}>
                    <option>USER</option>
                    <option>PROJECT OWNER</option>
                    <option>INVESTOR</option>
                    <option>REVIEWER</option>
                </select>
            <button onClick={() => {setSignUp(email, password, role)}}> Sign Up</button>
            </div>
        </Pop_up_modal>
    );
}

export default Sign_up_modal