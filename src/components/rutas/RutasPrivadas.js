import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {firebaseContext} from '../../firebase/index';
import { Spinner } from '../layout/Spinner';


export const RutaPrivada = ({children}) => {

    const {usuario} = useContext(firebaseContext);
    
    if(!usuario) return <Spinner/>

    if(usuario){
        if(usuario.ok){
            return children;
        }else{
            return <Navigate to="/"/>;
        }
    }

    return <Navigate to="/"/>;

    
    
}
