import FirestoreContext from "../context/FirestoreProvider";
import { useContext } from "react";

const useFirestore = () => {
    return useContext(FirestoreContext);
}

export default useFirestore;