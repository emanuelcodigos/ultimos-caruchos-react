import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {NavLink} from 'react-router-dom';


import { firebaseContext } from '../../firebase/index';
import './layout.component.css';


const ContenedorNav = styled.div`
   position: fixed;
   z-index:99999;
   width: 200px;
   height: 100vh;
   top:0;
   background-color: #151719;
   padding: 0;

   transition: all 200ms linear;

   ul{
       margin-top: 5rem;
   }
   li{
       list-style:none;
       color: rgba(230,230,230, .9);
       text-align: center;
       padding: 15px 10px;
       border-bottom: 1px solid rgba(100,100,100, .3);
   }

`;

const DivToggle = styled.div`

padding:2rem;
cursor: pointer;
position: absolute;
left: 200px;
span{
    border-radius: 10px;
    padding: 1rem 1.3rem;
    background-color: #343a40;
    color: #fff;
    font-size: 2.5rem;
}
`;



export const Navbar = () => {

    const { firebase, usuario } = useContext(firebaseContext);
    
    const nav = document.querySelector('#nav');
    const handleOcultar = () => {
        if (nav) {
            nav.classList.toggle('activeNav');
        }
    }

    const handleCerrarSesion = async () => {
        if (!usuario) return;

        await firebase.signOut();

    }

    return (

        <>
            <ContenedorNav id="nav" className="navInicial">
                <DivToggle onClick={handleOcultar}>
                    <span>&#9776;</span>
                </DivToggle>

                <ul>
                    <li><NavLink to='/'>Ultimos catuchos App</NavLink></li>
                    {
                        
                        (usuario) &&
                        <>
                            {
                                (!usuario.ok) &&
                                <>
                                    <li><NavLink to='/'>Inicio</NavLink></li>
                                    <li><NavLink to='/ingresar'>Ingresar</NavLink></li>
                                    <li><NavLink to='/registro'>Registrate</NavLink></li>
                                </>
                            }
                            {

                                (usuario.ok) &&
                                <>
                                    <li><NavLink to='/cuenta'>Mi Perfil</NavLink></li>
                                    <li onClick={handleCerrarSesion}>Cerrar sesion</li>
                                </>
                            }
                        </>

                    }
                </ul>
            </ContenedorNav>
        </>
    )
}
