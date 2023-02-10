import React from 'react'
import '../Menu'
import './PopUp.css'

function Pop_up_modal ({setActive, active, children}) {
    return(
        <div className= {active ? "Pop_up_modal active" : "Pop_up_modal"} onClick={() =>  setActive(false)}>
            <div className={active ? "Pop_up_modal_content active" : "Pop_up_modal_content"} onClick={function (e) {e.stopPropagation()}}>
                    {children}
            </div>
        </div>
    );
}

export default Pop_up_modal