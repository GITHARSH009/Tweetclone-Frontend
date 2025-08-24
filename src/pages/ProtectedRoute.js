import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import {auth} from '../firebase.init';
import { PageLoading } from './Login/PageLoading';

const ProtectedRoute = ({children}) => {
    const [user, loading, error] = useAuthState(auth);
    if(loading){
        return <PageLoading/>
    }
    if(error){
        console.log(error.message);
    }
    if(!user){
        return <Navigate to='/login'/>
    }
  return children;
};

export default ProtectedRoute