import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { NavLink } from 'react-router-dom';


import { firebaseContext } from '../firebase/index';
import {BotonDonacion} from './layout/BotonDonacion';
import logoCartuchos from '../img/ut-logo.svg';
import adivinaUt from '../img/portadas/adivina-ut.jpg';
import trivia from '../img/portadas/trivia.jpg';
import batallaPelis from '../img/portadas/batalla-peliculas.jpg';
import cosasNoSabias from '../img/portadas/cosas-no-sabias.jpg';
import invitados from '../img/portadas/invitados.jpg';




const SeccionInicio = styled.div`
  
   height: 100vh;
   background: radial-gradient(circle, rgb(66 58 84) 0%, rgb(22 22 23) 100%);

   img{
       margin: 5rem auto;
       width: 70%;
       max-width: 500px;
   }

   div{
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 85%;
    max-width: 500px;   
    margin: auto;

   }
`;

const BotonRelleno = styled.button`
    margin: 1rem auto;  
    width: 100%; 
    background-color: ${props => props.bgColor ? 'var(--violetaoscuro)' : 'var(--amarillo)'};
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-style: none;
    border-radius: 8px;

    font-size: 2rem;
    color:  ${props => props.bgColor ? 'var(--blanco)' : 'var(--violetaoscuro)'};
    font-weight: 600;
    text-transform: uppercase;

    box-shadow: ${props => props.bgColor ? '' : '1px 1px 5px #19171e'};
`;

const SeccionInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    text-align: center;
    background-color: var(---blanco);
    margin-top: 3rem;
    width: 90%;
    max-width: 600px;
    

    h1, h2{
        font-size: 2.5rem;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--violetaoscuro);
        margin: 0;
    }
    h2{
        font-size: 3rem;
        font-weight: 700; 
    }

`;

const SeccionJuegos = styled.div`
height: 100%;
background-color: var(--violetaprincipal);


h2{
    text-align: center;
    color: var(--amarillo);
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 0;
    font-size: 1.8rem;
    
 }
 h1{
  margin: 0;
  text-align: center;
  color: var(--blanco); 
  font-size: 5rem;
  margin-bottom: 2rem;
  
 }
 div{
    width: 95%;
    display: flex;
    overflow-x: auto;
 }
`;

const CardJuegos = styled.div`

    min-width: 220px;
    max-width: 300px;
    padding: 8px;
    margin-left: 1.5rem;
    border-radius: 8px;
    color: #000;
    min-height: 330px;
    background-color: var(--blanco);
    

    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align:center;
        margin:auto;

        img{
            
            width: 100%;
            max-width: 250px;
            border-radius: 10px;
            
        }
        h5{
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        p{
            margin-top: 0;
            margin-bottom: 1rem;
        }

        button{
            font-size:2.5rem;
            color: var(--blanco);
            margin: auto;
            width: 100%;
            background-color: var(--violetaprincipal);
            border-style: none;
            padding: 1rem;
            border-radius: 6px;
            margin-bottom: 1rem;
        }
    }

`;

const SeccionOtrosJuegos = styled.div`
    height: 100%;
    background-color: var(--verde);
    text-align: center;

    h2{
        
        color: var(--amarillo);
        font-weight: 900;
        text-transform: uppercase;
        margin-bottom: 0;
        font-size: 1.8rem;
        
     }
     h1{
      margin: 0;
      color: var(--blanco); 
      font-size: 5rem;
      margin-bottom: 2rem;
      
     }
`;

const DivCentrado = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    text-align: center;
    background-color: var(---blanco);
    margin-top: 3rem;
    width: 90%;
    max-width: 600px;
`;

const ContenedorCardCirculos = styled.div`
    max-width: 900px;
    display: flex;
    flex-direction: column;

    @media (min-width: 678px){
       flex-direction: row;
    }
`;
const CardCirculoJuego = styled.div`

    margin: auto;
    width: 300px;
    height: 300px;
    text-align: center;
    background-color: ${props => props.bgColor ? '#e69694' : '#cebf81'};
    padding: 3rem;
    border-radius: 20px;
    margin-bottom: 3rem;
    color: var(--blanco);
    display: flex;
    flex-direction: column;

        h2{
            font-size: 2.4rem;
            margin-bottom: 1rem; 
            font-weight: 700;
            color: var(--blanco);
        }
        p{
            margin: 0;
            padding: 1rem;
            font-weight: 600;
            background-color: ${props => props.bgColor ? '#e69694' : '#cebf81'};
            border-radius: 20px;
        }
        img{
            margin:auto;
            width: 130px;
            height:130px;
            border-radius: 100%;
        }
    }

`;

export const Home = () => {

    const { usuario } = useContext(firebaseContext);

    return (
        <>
            <BotonDonacion/>
            <SeccionInicio>
                <br /><br />
                <img src={logoCartuchos} alt='logo ultimos cartuchos' />

                <div>
                    {
                        (usuario) &&
                        <>
                            {
                                (usuario.ok) ? <BotonRelleno>Mi cuenta</BotonRelleno>
                                    :
                                    <BotonRelleno>Iniciar sesion</BotonRelleno>
                            }
                        </>
                    }
                    <a href="#juegos"><BotonRelleno >Juegos</BotonRelleno></a>

                </div>

            </SeccionInicio>

            <SeccionInfo>
                <h1>Utimos Cartuchos app</h1>
                <h2>¿Qué es?</h2>

                <p>Es una pagina web y aplicacion movil con los juegos de Ultimos Cartuchos</p>
                <BotonRelleno bgColor="true">Juegos</BotonRelleno>
                <br />
            </SeccionInfo>
            <SeccionJuegos id='juegos'>
                <br /><br />
                <h2>Juegos</h2>
                <h1>Juegos</h1>
                <p
                    style={{ color: '#e1e1e1', textAlign: 'center', fontSize: '2rem', margin: '2.5rem 0 1rem 0' }}
                >
                    &#60; &#8212; DESLIZA &#8212; &#62;</p>
                <div>
                    <CardJuegos>
                        <div>
                            <img src={adivinaUt} alt='adivina adivina ut' />
                            <h5>Adivina Adivina UT</h5>
                            <p>Trata de adivinar qué cancion es, pero su letra será reemplazada por UT.</p>
                            <NavLink to="/juegos/adivina-ut" style={{width: '90%'}}><button>Jugar</button></NavLink>
                        </div>
                    </CardJuegos>
                    <CardJuegos>
                        <div>
                            <img src={batallaPelis} alt='batallla de las peliculas' />
                            <h5>La batalla de las peliculas</h5>
                            <p>Intenta adivinar las peliculas.</p>
                            <NavLink to="/juegos/batalla-peliculas" style={{width: '90%'}}><button>Jugar</button></NavLink>
                        </div>
                    </CardJuegos>
                    <CardJuegos>
                        <div>
                            <img src={trivia} alt='trivia ultimos cartuchos' />
                            <h5>Trivia UT</h5>
                            <p>Proguntas relacionas con el show!!</p>
                            <button>Jugar</button>
                        </div>
                    </CardJuegos>
                </div>
                <DivCentrado>
                    <a href="#mas-juegos"><BotonRelleno bgColor="true">Mas juegos</BotonRelleno></a>
                </DivCentrado>

            </SeccionJuegos>

            <SeccionOtrosJuegos id='mas-juegos'>
                <br /><br />
                <h2>Juegos</h2>
                <h1>Otros Juegos</h1>

                <ContenedorCardCirculos>
                    <CardCirculoJuego bgColor="true">
                        <NavLink to="/juegos/no-sabias">
                            <img src={cosasNoSabias} alt='cosas que no sabias' />
                            <h2>Cosas que no sabias</h2>
                            <p>¿Cuanto sabes sobre datos random?</p>
                        </NavLink>

                    </CardCirculoJuego>

                    <CardCirculoJuego >
                        <NavLink to="/juegos/personajes">
                            <img src={invitados} alt='invitados' />
                            <h2>Me gustaria que Vicki</h2>
                            <p>Eligí quién será un invitado del show.</p>
                        </NavLink>

                    </CardCirculoJuego>
                </ContenedorCardCirculos>
                <br /><br />
            </SeccionOtrosJuegos>




        </>
    )
}
