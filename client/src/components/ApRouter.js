import React, { useContext } from 'react';
import {Routes, Route} from 'react-router-dom'
import { authRoutes, nonAuthRoutes } from '../routes';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return(
        <Routes>
            {user.isAuth === true && authRoutes.map( ({path, Component}) => 
                <Route key = {path} path = {path} element = {<Component/>} exact/>
            )}

            {nonAuthRoutes.map( ({path, Component}) => 
            <Route key = {path} path = {path} element = {<Component/>} exact/>
            )}
        </Routes>
    );
})

export default AppRouter