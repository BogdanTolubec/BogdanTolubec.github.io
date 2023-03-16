import { observer } from 'mobx-react-lite';
import react, {useState} from 'react'
import { useContext } from 'react';
import { Context } from '../../../..';
import { updateUserRole } from '../../../../http/userApi';
import Pop_up_modal from '../../../Menu/Authorisation/PopUp';
import { inputsClear } from '../clearFunction';
import './ChangeUserRoleModal.css'

const inputs = document.getElementsByClassName('inputs')

const UpdateUserRoleModal = observer(({active, setActive}) => {

    const {project} = useContext(Context)

    const [userEmail, setUserEmail] = useState()
    const [newUserRole, setNewUserRole] = useState("USER")

    const updateRole = () => {

        try{

            let formData = {
            userEmail: userEmail,
            newUserRole: newUserRole,
            }

            console.log("after form data: " + JSON.stringify(formData))

            updateUserRole(formData).then(() => {
                alert("Success")
                setUserEmail('')
            })

            inputsClear(inputs)
            } 
            
            catch (e){
                alert(e)
                inputsClear(inputs)
        }
    }

    return(
        <Pop_up_modal active = {active} setActive = {setActive}>
            <div className = 'wrapper'>

                <label> User email: </label>
                <input className='inputs' onChange = {(e) => {setUserEmail(e.target.value)}} placeholder = 'Dmytro2010@gmail.com'></input>

                <label> New user role: </label>

                <select onChange = {(e) => {setNewUserRole(e.target.value)}}>
                    <option>USER</option>
                    <option>REVIEWER</option>
                </select>

                <button id = 'add' onClick={() => {updateRole()}}> Change role </button>
            </div>
        </Pop_up_modal>
    );
})

export default UpdateUserRoleModal