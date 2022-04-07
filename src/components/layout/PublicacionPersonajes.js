import React, { useState } from 'react';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import {FcLikePlaceholder, FcLike } from 'react-icons/fc';

import { useLikearPublicacion } from '../../hooks/usePublicaciones';


const ContendorPublicacion = styled.div`
    margin: auto;
    padding: 1rem;
    border-bottom: 1px solid var(--gris);
    margin-bottom: 1rem;
    text-align: center;  
`;

const NombrePersonaje = styled.p`
    margin:0;
    padding: 0;
    font-weight: 700;
    font-size: 2.1rem;
    color: var(--violetaoscuro);
    margin-bottom: 1.5rem;
`;
const DescripcionPersonaje = styled.p`
    margin:0;
    padding: 0;
    width: 90%;
    margin:auto;
    margin-bottom: 2rem;
    color: var(--gris);
`;

const ContendorBotones = styled.div`
    
    margin:auto;
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p{
        font-size: 2.6rem;
        font-weight: 600;
        color: var(--violetaoscuro);
        margin:0;
        padding: 0;
    }
`;


export const PublicacionPersonajes = ({ data }) => {

    const [idUsuario, likearPublicacion] = useLikearPublicacion();
    const [stateLike, setStateLike] = useState(false);

    const { data: { usuario, nombre, descripcion, likes, arrayLikes } } = data;
    const idPublicacion = data.id;

    const handleLike = async () => {
        if(idUsuario){
            setStateLike(true);
            const resp = await likearPublicacion('invitados', idPublicacion);
            if(!resp.ok){
                setStateLike(false);
            }
        }else{
            return Swal.fire('error', 'Debes iniciar sesion', 'error');
        }
    }

    return (
        <ContendorPublicacion>
            <NombrePersonaje>{nombre}</NombrePersonaje>
            <DescripcionPersonaje>{descripcion}</DescripcionPersonaje>

            <ContendorBotones>
                {
                    (arrayLikes) &&
                    <>
                        {
                            (arrayLikes.includes(idUsuario) || stateLike)
                                ?
                                <FcLike size='2.5rem' />
                                : 
                                <FcLikePlaceholder onClick={handleLike} size='2.5rem' />
                        }
                    </>
                }
                {(!stateLike) ? (<p>{likes}</p>)
                  : (<p>{likes + 1}</p>)
                      
                }

            </ContendorBotones>
        </ContendorPublicacion>
    )
}
