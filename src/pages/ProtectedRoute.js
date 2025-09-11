import React from 'react'
import { Navigate } from 'react-router-dom';
import useUserAuth from '../Context/UserAuthContext'; // Updated import
import { PageLoading } from './Login/PageLoading';

const ProtectedRoute = ({children}) => {
    const { user, loading } = useUserAuth(); // Using our UserAuthContext instead
    
    if(loading){
        return <PageLoading/>
    }
    
    if(!user){
        return <Navigate to='/login'/>
    }
    
    return children;
};

export default ProtectedRoute