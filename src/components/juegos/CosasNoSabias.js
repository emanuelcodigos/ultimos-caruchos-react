import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import {FcIdea} from 'react-icons/fc';

import { useGetPublicaciones, ContenedorHeader, BotonCargarMas, ModalCrear, BotonCrear } from '../../hooks/usePublicaciones';
import { PublicacionesSabias } from '../layout/PublicacionesSabias';


const ContenedorCategorias = styled.div`
   width: 95%;
   max-width: 500px;
   margin: 1rem auto;
   padding: 1rem 0;
   display: flex; 
   overflow-x: auto;
`;

const Categoria = styled.div`
    border-radius: 8px;
    margin-right: 1rem;
    padding: 1rem 2rem;
    background-color: var(--violetaprincipal);
    color: var(--blanco);
    font-weight: 700;
    cursor: pointer;
`;
export const CosasNoSabias = () => {

    const [statePubliciones, stateNroPublicaciones, getPublicaciones, resetPublicaciones] = useGetPublicaciones();
    const [stateBusqueda, setStateBusqueda] = useState({ condicion: { campo: 'nro_publicacion', orden: 'desc' },whereBusqueda:  {porCateg: false, categoria: ''}  });
    const [mostrarModal, setMostrarModal] = useState(false);

    const { condicion, whereBusqueda } = stateBusqueda;

    const handleBuscarPorCategoria = (categoria) => {

        const whereB = {
            campo: 'categoria',
            comparacion: '==',
            comparado: categoria
        }
        setStateBusqueda({
            ...stateBusqueda,
            whereBusqueda: {
                porCateg: true,
                categoria
            }
        });

        resetPublicaciones();

        getPublicaciones('cosas_que_no_sabias', condicion, 8, whereB);

    }

    const handleCargarMas = () => {

        const whereA = {
            campo: 'nro_publicacion',
            comparacion: '<',
            comparado: stateNroPublicaciones.nro
        }
        
        let whereB = '';
        if(whereBusqueda.porCateg){
            whereB = {
                campo: 'categoria',
                comparacion: '==',
                comparado: whereBusqueda.categoria
            }
        }
        
        getPublicaciones('cosas_que_no_sabias', condicion, 8, whereA, whereB);
    }


    useEffect(() => {
        getPublicaciones('cosas_que_no_sabias', condicion, 8);
        

    }, []);

    return (
        <>
            <ContenedorHeader>
                <br />
                <HiQuestionMarkCircle size='8rem' color='white' />
                <h1>Cosas que no sabias</h1>
                
            </ContenedorHeader>
            <ContenedorCategorias>
                <Categoria onClick={() => handleBuscarPorCategoria('ciencia')}>Ciencia</Categoria>
                <Categoria onClick={() => handleBuscarPorCategoria('deportes')}>Deportes</Categoria>
                <Categoria onClick={() => handleBuscarPorCategoria('arte')}>Arte</Categoria>
                <Categoria onClick={() => handleBuscarPorCategoria('random')}>Random</Categoria>
                <Categoria onClick={() => handleBuscarPorCategoria('cine')}>Musica</Categoria>
            </ContenedorCategorias>

            {
                (statePubliciones) &&
                <>
                    {
                        statePubliciones.map(publi => (
                            <PublicacionesSabias
                                key={publi.id}
                                data={publi}
                            />
                        ))
                    }

                    {
                        (stateNroPublicaciones.cargarMas) &&
                        <BotonCargarMas onClick={handleCargarMas}>MOSTRAR MAS</BotonCargarMas>
                    }
                </>

            }
            <BotonCrear onClick={() => setMostrarModal(true)}><FcIdea size='4rem'/></BotonCrear>
            {
                (mostrarModal) && <ModalCrear handleOcualtar={setMostrarModal} titulo='Crear una publicacion' aceptaCategoria='false'/>
            }
        </>
    )
}
