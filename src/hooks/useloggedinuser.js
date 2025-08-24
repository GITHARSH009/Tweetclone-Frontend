import React,{useState,useEffect} from 'react'
import useUserAuth from '../Context/UserAuthContext'
import auth from '../firebase.init'

const Useloggedinuser = () => {
    const { user } = useUserAuth();
    const email = user?.email;
    const [loggedInUser, setLoggedInUser] = useState({});
    useEffect(() => {
        fetch(`http://localhost:8002/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                // console.log('from useLoggedinuser', data)
                setLoggedInUser(data)
            })
    }, [email, loggedInUser])

    return [loggedInUser, setLoggedInUser];
}

export default Useloggedinuser