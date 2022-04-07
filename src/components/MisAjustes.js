import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import {FcSupport} from 'react-icons/fc';

import { firebaseContext } from '../firebase/index';
import { useForm } from '../hooks/useForm';
import fotoUsuario from '../img/user.png';

const Contendor = styled.div`
   height: 100vh;
   background-color: #2b3b45;
   
`;

const Formulario = styled.form`
    margin: auto;
    width: 90%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    
    input{
        margin: auto;
        width: 100%;
        padding: 1.3rem;
        border-style: none;
        border-radius: 8px;
        margin-bottom: 1.5rem;
    }
    span{
        margin-left: 1rem;
        margin-bottom: 1rem;
        font-size: 2rem;
        font-weight:700;
        color: var(--blanco);
    }
`;

const Imagen = styled.div`
     margin: auto;
     width: 130px;
     height:130px;
     background-color: #000;
     border-radius: 100%;
     margin-bottom: 3rem;
     position:relative;

     img{
         position:absolute;
         width: 130px;
         height:130px;
         border-radius: 100%;
     }
     div{
         position: absolute;
         z-index: 1;
         width: 4rem;
         height: 4rem;
         color: var(--blanco);
         top: -5px;
         right: -15px;
         padding: 5px;
         border-radius: 100%;
         background-color: var(--blanco);
         display:flex;
         justify-content: center;
     }
`; 

const ContendorPuntaje = styled.div`
   margin:auto;
   margin-top: 2rem;
   width: 90%;
   max-width: 500px;
   padding:2rem;
   border-radius: 10px;
   background-color: var(--gris3);
   text-align:center;
   
   h2{
       margin: 0;
       margin-bottom: 1rem;
       font-weight: 700;
       color: var(--violetaoscuro);
   }

   p{
       margin: 0;
       padding:0;
       font-size: 5rem;
       color: var(--violetaoscuro);
       font-weight: 900;

   }
`;


export const MisAjustes = () => {

    const { firebase, usuario } = useContext(firebaseContext);
    const [stateUsuario, setstateUsuario] = useState({});
    const [formValues, handleInputChange] = useForm({nombre: ''});
    const {nombre} = formValues; 

    const { data } = stateUsuario;

    console.log(stateUsuario);

    if (usuario) {
        if (!usuario.ok) {
            return <Navigate to='/ingresar' />
        }
    }

    useEffect(async () => {

        const data = await firebase.mostrarInformacionUsuario(usuario.usuario.uid);

        setstateUsuario(data);

    }, []);


    return (
        <Contendor>
            <br/><br/><br/>
            {
                (data) &&
                (
                    <>
                        <Imagen>
                            <div>{<FcSupport size='2.5rem'/>}</div>
                            {
                                (data.dataUsuario.imgenPerfil) ? (<img src={data.dataUsuario.imgenPerfil}/>)
                                :
                                (<img src={fotoUsuario}/>)
                            }
                            
                        </Imagen>

                        <Formulario>
                            <div>
                                <span>Nombre</span>
                                <input
                                    type='text'
                                    placeholder={data.dataUsuario.nombre}
                                    value={nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <span>Email</span>
                                <input
                                    type='email'
                                    placeholder={data.dataUsuario.email}
                                />
                            </div>
                        </Formulario>

                        <ContendorPuntaje>
                            <h2>Tu Puntaje</h2>
                            <p>{data.puntaje}</p>
                        </ContendorPuntaje>
                        
                    </>
                )
            }

        </Contendor>
    )
}
