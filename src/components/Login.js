import React, { useContext } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

import {firebaseContext} from '../firebase/index';
import {ContendorFormulario,Formulario,BotonSubmit,ContenedorRedes, BotonRedSocial,ParrafoLoginSingIn,SeparadorDiv} from '../components/layout/UiAuth';
import {useForm} from '../hooks/useForm';
import logoGoogle from '../img/google-icon.svg';


export const Login = () => {

    const {firebase, usuario} = useContext(firebaseContext);
    const [formValues, handleInputChange] = useForm({email: '', password: ''});
    const {email, password} = formValues;
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(email.trim() === '' || password.trim() === ''){
            return Swal.fire('Error', 'Completa todos los campos', 'error');
        }

        const resp = await firebase.iniciarSesion(email, password);

        if(!resp.ok){
            return Swal.fire('Error', resp.msg, 'error');
        }
        
        return <Navigate replace to="/"/>
        
    }

    if(usuario){
        if(usuario.ok){
            return <Navigate replace to="/"/>
        }
    }
    return (
        <ContendorFormulario>
            <br /><br /><br />
            <h2>Ultimos Cartuchos App</h2>
            <h1>Iniciar Sesion</h1>

            <Formulario onSubmit={handleSubmit}>
                
                <input
                    type="email"
                    placeholder="Tu email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="contraseña"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />
            
                <BotonSubmit
                    type="submit"
                    value="iniciar sesion"
                />

                <SeparadorDiv>
                    <div></div>
                    <p>O ingresa con</p>
                    <div></div>
                </SeparadorDiv>

            </Formulario>

            <ContenedorRedes>
                <BotonRedSocial>
                    <img src={logoGoogle}/>
                    <p>Google</p>
                </BotonRedSocial>
            </ContenedorRedes>

            <ParrafoLoginSingIn>
                <NavLink to='/registro'>No tengo una cuenta, <span>registrate aqui</span></NavLink>
            </ParrafoLoginSingIn>

        </ContendorFormulario>
    )
}
