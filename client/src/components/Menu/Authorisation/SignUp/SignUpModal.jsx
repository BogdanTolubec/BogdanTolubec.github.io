import React from 'react'
import './SignUpModal.css'
import Pop_up_modal from '../PopUp'
import { useState } from 'react'

function Sign_up_modal({setActive, active, setSignUp}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <Pop_up_modal setActive={setActive} active = {active}>
            <div className = 'sign_up_wrapper'>
                <p>Sign Up</p>
                
                <label>Email</label>
                <input placeholder='John228@gmail.com' value = {email} onChange = {(e) => {setEmail(e.target.value)}}></input>

                <label>Password</label>
                <input type = "password" placeholder='********' value = {password} onChange = {(e) => {setPassword(e.target.value)} }></input>

                <a href='/'>I want to be a reviewer!</a>

            <button onClick={() => {setSignUp(email, password)}}> Sign Up</button>
            </div>
        </Pop_up_modal>
    );
}

export default Sign_up_modal