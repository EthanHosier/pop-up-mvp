import { useMemo, useState, createContext, useEffect } from "react"
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage"

const FirestoreContext = createContext({});

export const FirestoreProvider = ({children}) => {


    const [name, setName] = useState("");
    const [gender, setGender] = useState("")

    //imperfect solution for this - improve this.
    const loadData = async(id) => {
        const data = (await firestore().collection("users").doc(id).get()).data();
        if(!data) return;

        setName(data.name);
        setGender(data.gender);
    }

    const clearLocalStorage = () => {
        setName("")
        setGender("")
    }

    const setInitialProfile = async(name, gender, image, id) => {
        //TODO: set local states to store these locally ^


        
        //in real app do this through the server. Also use timed get urls instead of download urls:
        
        
        const firebasePath = `/pics/${id}.${image.mime.split("/")[1]}`
        const reference = storage().ref(firebasePath);
        const response = await reference.putFile(image.path)
        const url = await storage().ref(firebasePath).getDownloadURL();

        await firestore().collection("users").doc(id).set({
            name,
            gender,
            picUrl: url
        })
        
        setName(name);
        setGender(gender)
        return true;
        
    }

    const memoedFirestore = useMemo(() => ({
        name,
        gender,
        loadData,
        setInitialProfile,
        clearLocalStorage
    }),[gender,name])

    return(
        <FirestoreContext.Provider value={memoedFirestore}>
            {children}
        </FirestoreContext.Provider>
    )
}

export default FirestoreContext;