import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BiCoffeeTogo } from 'react-icons/bi';

const DivDonacion = styled.div`
   position: fixed;
   right: 12px;
   bottom: 20px;
   display: flex;
   align-items: center;
`;

const DivDescripcion = styled.div`
   border-radius: 8px;
   background-color: var(--violetaprincipal);
   border: 1px solid var(--violetaoscuro);
   padding: 0.7rem;
   margin-right: 1rem;
   text-align: center;

   p{
       margin: 0;
       padding: 0;
       color: var(--blanco);
       font-size: 1.5rem;
   }
   a{
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--blanco);
   }
`;
const Boton = styled.button`
   width: 60px;
   height: 60px;
   border-radius: 100%;
   background-color: var(--violetaprincipal);
   border-style: none;
   border: 1px solid var(--violetaoscuro);
`;


export const BotonDonacion = () => {

    const [descripcion, setDescripcion] = useState(false);

    const handleVerDescripcion = () => {
        setDescripcion(ant => !ant);
    }
    return (
        <DivDonacion>

            {
                (descripcion) &&
                <DivDescripcion>
                    <p>Si te gusto la app</p>
                    <p>Podes apoyarme haciendo</p>
                    <a href='https://cafecito.app/emanuel-programador' target='_blank'>Click aqui</a>
                </DivDescripcion>
            }
            <Boton onClick={handleVerDescripcion}><BiCoffeeTogo color='white' size='2.6rem' /></Boton>
        </DivDonacion>
    )
}
