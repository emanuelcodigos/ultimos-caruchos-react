import { useEffect, useState } from "react";
import {firebase} from "../firebase/index";


export const useAutenticacion = () => {

    const [userAuth, setuserAuth] = useState(null);

    useEffect( () => {

        const unsubscribe = firebase.auth.onAuthStateChanged(usuario => {
        
            if( usuario) {
                setuserAuth({ok: true, usuario});
                
            }else{
                setuserAuth({ok: false});
            }
        });

        return () => unsubscribe();
    }, []);

    return userAuth;
}