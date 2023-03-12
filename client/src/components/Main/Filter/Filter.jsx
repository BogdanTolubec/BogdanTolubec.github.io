import { observer } from 'mobx-react-lite'
import React, { useContext} from 'react'
import { Context } from '../../..'
import "./Filter.css"

const Filter = observer(() => {

    const {filter} = useContext(Context)

    return(
        <div className = 'filter'>
        <img src = 'https://cdn-icons-png.flaticon.com/512/107/107799.png'></img>

        <select className = "Filter" onChange={e => {filter.setState(e.target.value); console.log("Filter: " + filter.state); /*window.location.reload()*/}}>
            <option value = {"all"}>all</option>
            <option value = {"education"}>education</option>
            <option value = {"farming system"}>farming system</option>
            <option value = {"internet-things"}>internet-things</option>
        </select>

        </div>
    );
})

export default Filter