import { createContext, useState, useEffect, useMemo } from 'react';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const onAuthStateChanged = async (user) => {
        console.log(user)
        setUser(user)
        if (initializing) setInitializing(false)
    }

    const signInEmailPassword = async (email, password) => {
        let errorCode = "";

        await auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => console.log("signed in"))
            .catch(error => errorCode = error.code)

        return errorCode

    }

    const createUserEmailPassword = async (email, password) => {
        let errorCode = "";

        await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => console.log("account created + signed in"))
            .catch(error => errorCode = error.code)

        return errorCode

    }

    //TODO: have more elaborate sign out procedure (ie, with different loading type and not reusing initializing)
    const signout = async () => {
        setInitializing(true)
        await auth().signOut();
        setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])

    const memoedAuth = useMemo(() => ({
        user,
        signout,
        createUserEmailPassword,
        signInEmailPassword,
    }), [user])



    return (
        <AuthContext.Provider value={memoedAuth}>
            {!initializing && children}
        </AuthContext.Provider>
    )
}

export default AuthContext