import React, { useContext } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';


import { useForm } from '../hooks/useForm';
import { firebaseContext } from '../firebase/index';
import {ContendorFormulario,Formulario,BotonSubmit,ContenedorRedes, BotonRedSocial,ParrafoLoginSingIn,SeparadorDiv} from '../components/layout/UiAuth';
import logoGoogle from '../img/google-icon.svg';


export const Registro = () => {

    const dispatch = useDispatch();
    const { firebase, usuario } = useContext(firebaseContext);

    if(usuario){
        if(usuario.ok){
            return <Navigate replace to="/"/>
        }
    }

    const [formValues, handleInputChange] = useForm({ nombre: '', email: '', password: '', password2: '' });
    const { nombre, email, password, password2 } = formValues;

    const handleSubmit = async (e) => {

        e.preventDefault();

        const registracion = await firebase.registrar(nombre, email, password);

        console.log(registracion);
        if (registracion.ok) {
            return Swal.fire('Registrado', registracion.msg, 'success');
        } else {
            return Swal.fire('error', registracion.msg, 'error');
        }

    }

    const handleLoginGoogle = () => {
        firebase.loginWithGoogle();
    }

    

    return (
        <ContendorFormulario>
            <br /><br /><br />
            <h2>Ultimos Cartuchos App</h2>
            <h1>Registrate</h1>

            <Formulario onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tu nombre"
                    name='nombre'
                    value={nombre}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    placeholder="Tu email"
                    name='email'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="contraseña"
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="confirmar contraseña"
                    name='password2'
                    value={password2}
                    onChange={handleInputChange}
                />

                <BotonSubmit
                    type="submit"
                    value="crear cuenta"
                />

                <SeparadorDiv>
                    <div></div>
                    <p>O registrate con</p>
                    <div></div>
                </SeparadorDiv>

            </Formulario>

            <ContenedorRedes>
                <BotonRedSocial onClick={handleLoginGoogle}>
                    <img src={logoGoogle}/>
                    <p>Google</p>
                </BotonRedSocial>
            </ContenedorRedes>

            <ParrafoLoginSingIn>
                <NavLink to='/ingresar'>Tengo una cuenta, <span>inciar sesion aqui</span></NavLink>
            </ParrafoLoginSingIn>

        </ContendorFormulario>

    )
}
