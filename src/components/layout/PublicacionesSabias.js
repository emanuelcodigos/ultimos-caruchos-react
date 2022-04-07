import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import Swal from 'sweetalert2';

import {useLikearPublicacion} from '../../hooks/usePublicaciones';


const ContenedorPublicacion = styled.div`
   margin:auto; 
   width: 95%;
   max-width:500px;
   padding: 1rem;
   margin-bottom: 1rem;
   border-bottom: 2px solid var(--gris3); 
   img{
       margin: auto;
       border-radius: 5px;
       max-height: 250px;
   }
`;

const DivDescripcion = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
        margin: 0 1rem;
        padding: 0;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--gris2);
    }
`;

const Likes = styled.div`
   display: flex;
   align-items: center;
   justify-content: start;
   padding: 1rem;
   p{
       margin: 0 2rem;
       padding: 0;
       font-size: 2.3rem;
       font-weight: 700;
       color: var(--violetaoscuro);
   }
`;
const TituloPublicacion = styled.p`
    width: 90%;
    padding: 0;
    margin: 0 auto;
    font-size: 2.2rem;
    color: var(--violetaoscuro);
    font-weight: 700;
`;

const DescripcionPublicacion = styled.p`
   width: 90%;
   margin:auto;
   text-align: justify;
   font-size: 1.6rem;
`;

const CreadoPor = styled.p`
   text-align: center;
   margin: 0.8rem;
   color: var(--gris2);
   font-size: 1.5rem;
   font-weight: 600;

   span{
       font-weight: 700;
   }

`;
export const PublicacionesSabias = ({ data }) => {

    const { id, data: { categoria, usuario, descripcion, imagen, likes, titulo, arrayLikes } } = data;
    const [idUsuario, likearPublicacion] = useLikearPublicacion();
    const [stateLike, setStateLike] = useState(false);

    const handleLike = async() => {
        if(idUsuario){
            setStateLike(true);
            const resp = await likearPublicacion('cosas_que_no_sabias', id);
            if(!resp.ok){
                setStateLike(false);
                Swal.fire('error', 'Ocurrio un error en el servidor', 'error');  
            }
        }else{
            Swal.fire('Error', 'Tienes que iniciar sesion', 'error');
        }
    }
    return (
        <ContenedorPublicacion>
            <img src={imagen} />
            <DivDescripcion>
                <Likes>
                    {
                        (arrayLikes.includes(idUsuario) || stateLike) ? 
                        <FcLike size='2.7rem'/>
                        :
                        <FcLikePlaceholder size='2.7rem' onClick={handleLike}/>
                        
                    }
                    <p>{ (stateLike) ? likes + 1 : likes }</p>
                </Likes>
                <p>{categoria}</p>
            </DivDescripcion>
            <TituloPublicacion>{titulo}</TituloPublicacion>
            <DescripcionPublicacion>{descripcion}</DescripcionPublicacion>
            <CreadoPor>Creado por: <span>{usuario.nombre}</span></CreadoPor>
        </ContenedorPublicacion>


    )
}
