import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FcRating, FcApproval } from 'react-icons/fc';

import { firebaseContext } from '../../firebase/index';
import imagenUsuario from '../../img/user.png';
import top0 from '../../img/rankigs/top1.svg';
import top1 from '../../img/rankigs/top2.svg';
import top2 from '../../img/rankigs/top3.svg';

const ContendorPrincipal = styled.div`
    height: 100%;
    background-color: var(--blanco);
    display: flex;
    flex-direction: column;
    margin: auto;
`;

const ContendorInfoJugador = styled.div`
    width: 100%;
    margin:auto;
    min-height: 100px;
    background-color: var(--azul);
    padding: 2rem;
    border-radius: 0 0 10px 10px;
    text-align: center;

    img{
        width: 90px;
        height: 90px; 
        margin: auto;
        margin-top: 3rem;
        border-radius: 100%;
    }
    p{
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--blanco);
        margin: 1rem 0 1rem 0;
    }
`;

const ContenedorPuntuacion = styled.div`
     margin: 2rem auto 2rem auto;
     display: flex;
     justify-content: space-between;
     width: 90%;
     max-width: 500px; 
`
const BloquePuntuacion = styled.div`
     margin: auto;
     width: 150px;
     height: 150px;
     background-color: var(--azul);
     border-radius: 10px;

     div{
         margin-left: 5px;
         margin-top: 5px;
     }
     p{
         font-size: 2.4rem;
         font-weight: 900;
         color: var(--blanco);
         margin: 0;
         padding: 0;
         text-align: center; 
     }
     h3{
        font-size: 3rem;
         font-weight: 700;
         color: var(--blanco);
         margin: 0;
         padding: 0;
         text-align: center;  
     }

`;

const ContenedorRanking = styled.div`
    margin: auto;
    width: 90%;
    max-width: 400px;
    background-color: var(--gris3);
    border-radius: 10px;

    h2{
        margin-left: 1rem;
        padding: 1rem;
        text-transform: uppercase;
        font-size: 2.2rem;
        color: var(--azul); 
    }
`;

const RankingJugador = styled.div`
    width: 95%;
    margin: auto;
    padding: 1rem .3rem;
    border-radius: 8px;
    background-color: var(--azul);
    display: grid;
    grid-template-columns: 15% 35% 50%;
    align-items:center;
    margin-bottom: 1rem;
    img{
        margin: auto;
        width: 50px;
        height:50px;
        border-radius: 100%;
    }
    p{
        margin: 0;
        padding: 0;
        margin-left: 1rem;
        color: var(--blanco);
    }

    div{
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 30px;
        }
        p{
            margin-left: 0;
            margin-right: 1rem;
        }
    }
    
`;
export const Puntaje = () => {

    const { usuario, firebase } = useContext(firebaseContext);

    const [stateJugador, setstateJugador] = useState(null);
    const [stateRanking, setRanking] = useState(null);
    useEffect(async () => {
        if (usuario) {
            if (usuario.ok) {
                const dataUsuario = await firebase.mostrarInformacionUsuario(usuario.usuario.uid);
                setstateJugador(dataUsuario.data);
            }
        }
    }, [usuario]);

    useEffect(async () => {
        const dataRanking = await firebase.consultarDocumentoDB('usuarios', { campo: 'puntaje', orden: 'desc' }, 3);
        setRanking(dataRanking);
    }, []);

    return (
        <ContendorPrincipal>
            <ContendorInfoJugador>
                <img src={stateJugador ? stateJugador.dataUsuario.imgenPerfil : imagenUsuario} />
                {
                    (stateJugador) ? <p>{stateJugador.dataUsuario.nombre}</p>
                        : <p>Jugador</p>
                }
            </ContendorInfoJugador>

            <ContenedorPuntuacion>
                <BloquePuntuacion>
                    <div><FcRating size='3.2rem' /></div>
                    <p>Puntaje</p>
                    <h3>550</h3>
                </BloquePuntuacion>
                <BloquePuntuacion>
                    <div><FcApproval size='3.2rem' /></div>
                    <p>Aciertos</p>
                    <h3>7 de 10</h3>
                </BloquePuntuacion>
            </ContenedorPuntuacion>
            <ContenedorRanking>
                <h2>Ranking de jugadores</h2>
                {
                    (stateRanking) &&

                    stateRanking.map((ranking, i) => (
                        <RankingJugador key={ranking.id}>
                            <img src={ ranking.data.dataUsuario.imgenPerfil ? ranking.data.dataUsuario.imgenPerfil : imagenUsuario } />
                            <p>{ranking.data.dataUsuario.nombre}</p>
                            <div>
                                {(i === 0) && <img src={top0}/>}
                                {(i === 1) && <img src={top1}/>}
                                {(i === 2) && <img src={top2}/>}
                                <p>{ranking.data.puntaje}</p>
                            </div>
                        </RankingJugador>
                    ))
                }

            </ContenedorRanking>

        </ContendorPrincipal>

    )
}
