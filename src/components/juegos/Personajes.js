import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {FcIdea} from 'react-icons/fc';

import { useGetPublicaciones, ContenedorHeader, BotonCrear, ModalCrear,BotonCargarMas } from '../../hooks/usePublicaciones';
import { PublicacionPersonajes } from '../layout/PublicacionPersonajes';
import { Spinner } from '../layout/Spinner';

const ContendorPublicaciones = styled.div`
    margin:auto;
    width: 90%;
    max-width: 500px;
`;
let modoBusqueda = 'normal'; 
export const Personajes = () => {

    const [statePubliciones, stateNroPublicaciones, getPublicaciones, resetPublicaciones] = useGetPublicaciones();
    const [stateLoading, setStateLoding] = useState(true);
    //const [stateBusquedaPopulares, setStateBusquedaPopulares] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    const handleCargarMas = (inicia = false) => {
        let condicion = {campo: 'nro_publicacion', orden: 'desc'};
        let whereA = { campo: 'nro_publicacion', comparacion: '<', comparado: stateNroPublicaciones.nro };
        let whereB = '';

        if(modoBusqueda === 'popular'){
            condicion = {campo: 'likes', orden: 'desc'};
            whereA = {campo: 'likes', comparacion: '<=', comparado: stateNroPublicaciones.nroLikes};
            whereB = {campo: 'likes', comparacion: '!=', comparado: stateNroPublicaciones.nro}; 
        }

        if(inicia){
            whereA = '';
        }    

        getPublicaciones('invitados', condicion, 8, whereA, whereB);
    }

    const handleModoDeBusqueda = (target, modo) => { 
        
        resetPublicaciones();
        const divBotones = target.parentNode; 
        
        if(modo === 'popu'){
            divBotones.lastChild.style.backgroundColor = '#5c4f7f';
            divBotones.firstChild.style.backgroundColor = '#706395';
            modoBusqueda = 'popular';
            handleCargarMas(true);
        }else{
            divBotones.firstChild.style.backgroundColor = '#5c4f7f';
            divBotones.lastChild.style.backgroundColor = '#706395';
            modoBusqueda = 'normal'
            handleCargarMas(true);
        }

    }

    useEffect(() => {
        getPublicaciones('invitados', {campo: 'nro_publicacion', orden: 'desc'}, 8);
    }, []);

    useEffect(() => {
        if (statePubliciones) {
            setStateLoding(false);
        }
    }, [statePubliciones]);

    if (stateLoading) {
        return <Spinner />
    }

    return (
        <>
            <ContenedorHeader>
                <br /><br /><br />
                <h1>Me gustaria que vicki</h1>
                <div>
                    <button onClick={({target}) => handleModoDeBusqueda(target, 'reci')}>Recientes</button>
                    <button onClick={({target}) => handleModoDeBusqueda(target, 'popu')}>Populares</button>
                </div>
            </ContenedorHeader>

            <ContendorPublicaciones>
                {
                    statePubliciones.map(publi => (
                        <PublicacionPersonajes
                            key={publi.id}
                            data={publi}
                        />
                    ))
                }
            </ContendorPublicaciones>

            {
                (stateNroPublicaciones.cargarMas) && <BotonCargarMas onClick={() => handleCargarMas()}>Cargar mas</BotonCargarMas>
            }
            <BotonCrear onClick={() => setMostrarModal(true)}><FcIdea size='4rem'/></BotonCrear>

            {
                (mostrarModal) && <ModalCrear handleOcualtar={setMostrarModal} titulo='Crear Personaje'/>
            }

        </>
    )
}
