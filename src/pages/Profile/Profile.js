import React from 'react'
import "../Page.css"
import {auth} from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import MainProfile from './MainProfile/MainProfile'

function Profile() {

    const [user] = useAuthState(auth);
    return (
        <div className='profilePage'>
            <MainProfile user={user} />
        </div>
    )
}

export default Profile