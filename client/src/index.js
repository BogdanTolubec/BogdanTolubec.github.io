import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import userStore from './dataStorage/userStore';
import projectStore from './dataStorage/projectStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value = {
        {   
            user: new userStore(), //creating objects of storages classes(user storage and project storage )
            project: new projectStore(), //wee need it to save our changes and manipulations with context
        }
    }>
        <App />
    </Context.Provider>
);