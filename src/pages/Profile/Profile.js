import React from 'react'
import "../Page.css"
import useUserAuth from '../../Context/UserAuthContext';
import MainProfile from './MainProfile/MainProfile'

function Profile() {
    const { user } = useUserAuth();
    
    return (
        <div className='profilePage'>
            <MainProfile user={user} />
        </div>
    )
}

export default Profile