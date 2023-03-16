import React, { useState } from 'react'
import Sign_up_modal from './Authorisation/AuthorisationModals/SignUpModal'
import Sign_in_modal from './Authorisation/AuthorisationModals/SignInModal';
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import './Menu.css'
import { ADMIN_PAGE_ROUTE, CALCULATOR_PAGE_ROUTE,  CREATE_NEW_PROJECT_PAGE_ROUTE, MAIN_PAGE_ROUTE, REVIEW_PAGE_ROUTE, WATCHLIST_ROUTE } from '../../utils/consts';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { login, registration } from '../../http/userApi';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import Filter from '../Main/Filter/Filter';

const Menu = observer(() => {
    const [Sign_up_modal_active, set_sign_up_modal_active] = useState(false)
    const [Sign_in_modal_active, set_sign_in_modal_active] = useState(false)

    const {user} = useContext(Context)

    const navigate = useNavigate()

    const signIn = async (email, password) => {
        try{
            let data = await login(email, password);
            user.setUser(user)
            user.setIsAuth(true)
        } catch (e){
            alert(e.response.data.message)
        }
        navigate('/')
    }

    const signUp = async (email, password) => {
        try{
            let data = await registration(email, password);
            user.setUser(user)
            user.setIsAuth(true)
        } catch (e){
            alert(e.response.data.message)
        }
        navigate('/')
}

    const logOut = () => {
        user.setIsAuth(false)
        user.setUser({})
        localStorage.clear()
}

    return(
        <div className='menuWrapper'>
            { user.isAuth ? (<ul className="menu-main">

                <Filter/>

                <li><Link to = {MAIN_PAGE_ROUTE}> Home </Link></li>
                <li><Link to = {WATCHLIST_ROUTE}> Watchlist </Link></li>
                <li><Link to = {CREATE_NEW_PROJECT_PAGE_ROUTE}> My Project </Link></li>
                <li><Link to = {CALCULATOR_PAGE_ROUTE}> Calculator </Link></li>


                {jwt_decode(localStorage.getItem('token')).role === 'ADMIN' ? 
                (<><li><Link to={ADMIN_PAGE_ROUTE}>Admin panel</Link></li>
                <li><Link to={REVIEW_PAGE_ROUTE}>Review page</Link></li></>) : 

                console.log("Hello User!")}

                {jwt_decode(localStorage.getItem('token')).role === 'REVIEWER' ? 
                (<li><Link to={REVIEW_PAGE_ROUTE}>Review page</Link></li>) : 
                
                console.log("Hello Reviewer!")}
                
                <li><Link to = {MAIN_PAGE_ROUTE} onClick = {() => {logOut()}}>Log out</Link></li>
                </ul>)
                :                
                (<><ul className="menu-main">
                    <li><Link onClick={() => {set_sign_in_modal_active(true);}}>Sign in</Link></li>
                    <li><Link onClick={() => {set_sign_up_modal_active(true);}}>Sign up</Link></li>
                </ul>

                <Sign_up_modal setSignUp = {signUp} setActive={set_sign_up_modal_active} active={Sign_up_modal_active}/>
                <Sign_in_modal setSignIn={signIn} setActive={set_sign_in_modal_active} active={Sign_in_modal_active}/></>
                )
            }
        </div>
    );
})

export default Menu;