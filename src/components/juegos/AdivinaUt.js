import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import {
    usePuntajeJuego, useArrayPreguntas, ContendorJuego, useTemporizador, InstriccionesJuego,
    CirculoTemporizador, InputRespusta, useQuitarTildes
} from '../../hooks/useJuegos';
import { useForm } from '../../hooks/useForm';
import { Spinner } from '../layout/Spinner';
import botonPlay from '../../img/boton-play-ama.png';


const ContendorTitulo = styled.div`
   margin: auto;
   width: 85%;
   min-height: 150px;
   max-width: 400px;
   background-color: var(--blanco);
   border-radius: 10px;
   position: relative;

   h1{
       text-align: center;
   }
`;

const Titulos = styled.div`
    position: absolute;
    bottom: 10px;
    left: 1rem;
    margin: auto;
    display: flex;
    justify-content: center;
  
    img{
       width: 80px;
       margin-right: 1rem;
    }

    div{
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p{
            margin: 0;
            padding: 0;
            font-size: 2rem;
            color: #494949;
        }

        span{
            color: #262626;
            font-weight: 700;
        }
    }
`;

const ContendorOpciones = styled.div`
    margin:auto;
    margin-top: 2rem;
    width: 85%;
    max-width: 500px;
    background-color: var(--blanco);
    border-radius: 10px;

    h1{
        padding: 1.5rem 0 1rem 0;
        margin: 0;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
        color: var(--violetaoscuro);
    }

    p{
        align
    }

    div{
        margin-top: 1rem;
        display: flex;
        justify-content: center;

        button{
            margin: 1rem;
            padding: 1rem;
            border-radius: 8px;
            border-style: none;
            color: var(--blanco);
            background-color: #409343;
            font-size: 2rem;
            font-weight: 900;
        }
    }
`;

const BotonOpciones = styled.div`
   margin: auto;
   width: 90%;
   background-color: var(--gris3);
   padding:1rem;
   border-radius: 8px;
   cursor: poiner;
   font-size: 1.4rem;
   text-align: center;
`;

const TextoResultado = styled.p`
   margin: 0;  
   text-align: center;
   font-size: 3rem;
   font-weight: 900; 
   color: ${props => props.error ? '#d13d47' : '#409343'};
`;
const BotonSubmit = styled.input`
   margin: auto;
   width: 90%;
   padding: 1rem;
   border-radius: 8px;
   color: var(--blanco);
   background-color: var(--violetaprincipal);
   font-size: 1.8rem;
   font-weight: 700;
   display: block;
   border-style: none;
`;

export const AdivinaUt = () => {

    const [statePreguntas] = useArrayPreguntas('adivina_adivina_ut', 7);
    const [stateTemporizador, reinicarTemporizador, setFinalizar, setComenzar, stateComenzar] = useTemporizador(30);
    const [statePreguntaActual, setStatePreguntaActual] = useState({});
    const [stateAyuda, setStateAyuda] = useState(false);
    const [stateLoading, setStateLoading] = useState(false);
    const [stateMostarResultado,setMostarResultado] = useState(false);
    const [stateTextoResultado, setTextoResultado] = useState({texto: '', error: false});
    const [stateNumeroPregunta, setNumeroPregunta] = useState(0);

    const [formValues, handleInputChange, reset] = useForm({ cancionTitulo: '', cancionArtista: '' });
    const { cancionTitulo, cancionArtista } = formValues;

    const [puntos,sumarPuntaje, enviarDataResultados] = usePuntajeJuego();

    const navigate = useNavigate();

    const restablecerValores = () => {
        setStateAyuda(false);
        setStateLoading(false);
        reset();
    }


    const handleSiguientePregunta = () => {

        restablecerValores();

        if (stateNumeroPregunta < 7) {
            
            const actual = statePreguntas[stateNumeroPregunta].data;
            const posiblesRespuestas = [
                actual.correcta,
                actual.incorrecta1,
                actual.incorrecta2,
            ];

            setStatePreguntaActual({
                cancion: {
                    titulo: actual.correcta,
                    artista: actual.artista
                },
                musica: actual.cancion,
                opciones: posiblesRespuestas.sort(() => Math.random() - 0.5)
            });
            
            reinicarTemporizador(45);
        } else {
            reinicarTemporizador(100);
            setFinalizar(true);

            enviarDataResultados();
            navigate('/juegos/puntaje');

        }

    }
    const handleComenzarJuego = () => {

        setComenzar(true);
        handleSiguientePregunta();
        
    }

    if (stateTemporizador === 0) {
        setStateLoading(true);
        reinicarTemporizador(100);
        setFinalizar(true);
    
        console.log('incorrecto');
        //setTimeout(() => {
            setNumeroPregunta(prev => prev + 1);
            return;
        //}, 2000);
    }

    useEffect( () => {
        if(statePreguntas){
            handleSiguientePregunta();
        }
    }, [stateNumeroPregunta]);

    const handleArriesgarRespuesta = ({ target }) => {

        setFinalizar(true);

        if (!stateLoading) {

            if (target.innerHTML === statePreguntaActual.cancion.titulo) {
                target.style.backgroundColor = '#3d783f';
                setTextoResultado({texto: 'Correcto', error: false});
                sumarPuntaje(100);
            } else {
                target.style.backgroundColor = '#c93a50';
                setTextoResultado({texto: 'Incorrecto', error: true});
            }

            setMostarResultado(true);
            setTimeout(() => {
                target.style.backgroundColor = 'var(--gris3)';
                setNumeroPregunta(prev => prev + 1);
                setMostarResultado(false);
            }, 2500);

        }
        setStateLoading(true);

    }

    const handleSubmitRespuesta = (e) => {
        e.preventDefault();
    
        if(cancionTitulo.trim() !== '' || cancionArtista.trim() !== ''){
            setFinalizar(true);

            const cancionSinTilde = useQuitarTildes(cancionTitulo).toUpperCase();
            const artistaSinTilde = useQuitarTildes(cancionArtista).toUpperCase();
            if (!stateLoading) {
                if (cancionSinTilde === useQuitarTildes(statePreguntaActual.cancion.titulo.toUpperCase())) {
                    setTextoResultado({texto: 'Correcto', error: false});
                    sumarPuntaje(500);
                } else if (artistaSinTilde === useQuitarTildes(statePreguntaActual.cancion.artista.toUpperCase())) {
                    setTextoResultado({texto: 'Correcto', error: false});
                    sumarPuntaje(250);
                }else{
                    setTextoResultado({texto: 'Incorrecto', error: true});
                }
    
                setMostarResultado(true);
                setTimeout(() => {
                    setNumeroPregunta(prev => prev + 1);
                    setMostarResultado(false);
                }, 2500);
            }
    
            setStateLoading(true);
        }
    }

    const handlePedirAyuda = () => {
        setStateAyuda(true);
    }


    if (!statePreguntas) {
        return <Spinner />
    }
    return (
        <ContendorJuego>
            <br /><br /><br />
            {
                (stateComenzar) ?
                    (
                        <>
                            <ContendorTitulo>
                                <CirculoTemporizador><p>{stateTemporizador}</p></CirculoTemporizador>
                                <Titulos>
                                    <img src={botonPlay} />

                                    <div>
                                        <p>Cancion: <span>Desconocida</span></p>
                                        <p>Artista: <span>Desconocido</span></p>
                                    </div>
                                </Titulos>


                            </ContendorTitulo>
                            <ContendorOpciones>
                                <h1>¿Qué canción es?</h1>
                                
                                {
                                    (stateMostarResultado) && 
                                    <TextoResultado
                                    error={stateTextoResultado.error}
                                    >{stateTextoResultado.texto}</TextoResultado>
                                }
                            
                                <audio 
                                
                                src={ 
                                    (stateMostarResultado) ? '' : statePreguntaActual.musica
                                } 
                                
                                autoPlay loop/>
                                {
                                    (!stateAyuda) ?
                                        (
                                            <form onSubmit={handleSubmitRespuesta}>
                                                <InputRespusta
                                                    type='text'
                                                    placeholder='Nombre cancion'
                                                    name='cancionTitulo'
                                                    value={cancionTitulo}
                                                    onChange={handleInputChange}
                                                />
                                                <InputRespusta
                                                    type='text'
                                                    placeholder='Nombre artista'
                                                    name='cancionArtista'
                                                    value={cancionArtista}
                                                    onChange={handleInputChange}
                                                />
                                                <BotonSubmit
                                                    type='submit'
                                                    value='Confirmar respuesta'
                                                />
                                            </form>
                                        )
                                        :
                                        (
                                            <>
                                                <BotonOpciones onClick={handleArriesgarRespuesta}>{statePreguntaActual.opciones[0]}</BotonOpciones>
                                                <BotonOpciones onClick={handleArriesgarRespuesta}>{statePreguntaActual.opciones[1]}</BotonOpciones>
                                                <BotonOpciones onClick={handleArriesgarRespuesta}>{statePreguntaActual.opciones[2]}</BotonOpciones>
                                            </>
                                        )
                                }
                                <div>
                                    <button style={{ backgroundColor: '#ecb807' }}>{`${stateNumeroPregunta + 1} / 7`}</button>
                                    <button onClick={handlePedirAyuda}>Ayuda</button>
                                </div>
                            </ContendorOpciones>
                        </>
                    )
                    :
                    (
                        <InstriccionesJuego>
                            <h1>Adivina Adivina UT</h1>
                            <div>
                                <h3></h3>
                                <p>Vas a escuchar el fragmento de una cancion, pero su letra será reemplazada por 'UT'. Deberas adivinar de qué cancion se trata. Tendras un tiempo limite de 30 segundos para responder.</p>
                                <h3>Utiliza ayuda</h3>
                                <p>Si no estás seguro de la cancion podes presionar el boton de ayuda para obtener pistas</p>

                            </div>

                            <ul>
                                <li>adivinar cancion <span>500 puntos</span></li>
                                <li>adivinar artista <span>250 puntos</span></li>
                                <li>adivinar con ayuda <span>100 puntos</span></li>
                            </ul>

                            <button onClick={handleComenzarJuego}>comenzar</button>
                        </InstriccionesJuego>
                    )
            }

        </ContendorJuego>

    )
}
