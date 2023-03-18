import React from 'react'
import '../AuthorisationModalsStyles/AuthorisationModalsStyles.css'
import Pop_up_modal from '../PopUp'
import { useState } from 'react'

function Sign_in_modal({setActive, active, setSignIn}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
            <Pop_up_modal setActive={setActive} active = {active} className = 'modal_wrapper'>
                <div className = 'authorisation_modal_wrapper'>
                    <p>Sign in</p>

                    <label>Email</label>

                    <div className = 'text-field__icon text-field__icon_email'>
                        <input type = {"email"} placeholder='John1990@gmail.com' value = {email} onChange = {(e) => {setEmail(e.target.value)}}/>
                    </div>

                    <label>Password</label>

                    <div className = 'text-field__icon text-field__icon_password'>
                        <input type = 'password' placeholder = '*****' value = {password} onChange = {(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <button  onClick={() => {setSignIn(email, password)}}> Sign In </button>
                </div>
            </Pop_up_modal>
    );
}

export default Sign_in_modal