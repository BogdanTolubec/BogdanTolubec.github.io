import React from 'react'
import '../SignIn/SignInModal.css'
import Pop_up_modal from '../PopUp'
import { useState } from 'react'

function Sign_in_modal({setActive, active, setSignIn}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
            <Pop_up_modal setActive={setActive} active = {active} className = 'modal_wrapper'>
                <div className = 'sign_in_modal_wrapper'>
                    <label>Email</label>
                    <input placeholder='John1990@gmail.com' value = {email} onChange = {(e) => {setEmail(e.target.value)}}></input>
                    
                    <label>Password</label>
                    <input type = 'password' placeholder = '*****' value = {password} onChange = {(e) => {setPassword(e.target.value)}}></input>

                    <button  onClick={() => {setSignIn(email, password)}}> Sign In </button>
                </div>
            </Pop_up_modal>
    );
}

export default Sign_in_modal