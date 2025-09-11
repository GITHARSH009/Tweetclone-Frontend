import { useState, useEffect } from 'react'
import useUserAuth from '../Context/UserAuthContext';

const Useloggedinuser = () => {
    const { user, makeAuthenticatedRequest } = useUserAuth();
    const email = user?.email;
    const [loggedInUser, setLoggedInUser] = useState({});
    
    useEffect(() => {
        if (email) {
            makeAuthenticatedRequest(`https://tweetmaster.onrender.com/loggedInUser?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log('from useLoggedinuser', data)
                    setLoggedInUser(data)
                })
                .catch(error => {
                    console.error('Error fetching logged in user:', error);
                });
        }
    }, [email, makeAuthenticatedRequest]);

    return [loggedInUser, setLoggedInUser];
}

export default Useloggedinuser