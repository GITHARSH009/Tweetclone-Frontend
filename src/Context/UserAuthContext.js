import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase.init";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        // Clear token from localStorage when logging out
        localStorage.removeItem('firebaseToken');
        setToken(null);
        return signOut(auth);
    }

    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    // Function to get current user's ID token
    const getIdToken = async () => {
        if (user && user.getIdToken) {
            try {
                const token = await user.getIdToken();
                return token;
            } catch (error) {
                console.error('Error getting ID token:', error);
                return null;
            }
        }
        return null;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("Auth", currentUser);
            setUser(currentUser);
            
            if (currentUser) {
                try {
                    // Get the ID token
                    const idToken = await currentUser.getIdToken();
                    setToken(idToken);
                    // Store token in localStorage for API calls
                    localStorage.setItem('firebaseToken', idToken);
                    
                    // Set up token refresh
                    currentUser.getIdToken(true).then((refreshedToken) => {
                        setToken(refreshedToken);
                        localStorage.setItem('firebaseToken', refreshedToken);
                    });
                } catch (error) {
                    console.error('Error getting token:', error);
                }
            } else {
                setToken(null);
                localStorage.removeItem('firebaseToken');
            }
            
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // Function to make authenticated API calls
    const makeAuthenticatedRequest = async (url, options = {}) => {
        const currentToken = token || localStorage.getItem('firebaseToken');
        
        if (!currentToken) {
            throw new Error('No authentication token available');
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`,
            ...options.headers,
        };

        return fetch(url, {
            ...options,
            headers,
        });
    };

    const value = {
        user,
        token,
        loading,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        getIdToken,
        makeAuthenticatedRequest,
    };

    return (
        <userAuthContext.Provider value={value}>
            {children}
        </userAuthContext.Provider>
    );
}

export default function useUserAuth() {
    return useContext(userAuthContext);
}