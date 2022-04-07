import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FcFilmReel, FcCalendar, FcClapperboard } from 'react-icons/fc';


import { ContendorJuego, CirculoTemporizador, InstriccionesJuego, InputRespusta, useArrayPreguntas, useTemporizador, useQuitarTildes, useGuardarPuntaje, usePuntajeJuego } from '../../hooks/useJuegos';
import { useForm } from '../../hooks/useForm';
import { Spinner, SpinnerSmall } from '../layout/Spinner';



const ContendorPrincipal = styled.div`
    margin: auto;
    width: 90%;
    max-width: 600px;
    background-color: var(--blanco);
    color: var(--violetaoscuro);
    border-radius: 10px;
    position:relative;

    h4{
        margin: auto;
        color: var(--blanco);
        text-align: center;
        background-color: #d14747;
        padding: 1rem;
        border-radius: 0 0 8px 8px;
        
        span{
            font-weight: 900;
        }
    }
`;

const Imagen = styled.div`
    width: 100%;
    border-radius: 10px;
    height: 250px;
    display:flex;
    justify-content: center;
    border-radius: 1rem 1rem 0 0;
    img{
        max-height: 250px;
        margin: auto;
    }
`;

const ContenedorDescripcionPeli = styled.div`
    margin: 1rem auto 1rem auto;
    width: 90%;
    padding:1rem;
    border-radius: 10px;
    background-color: var(--gris3);
    
    h3{
        width: 85%;
        margin:auto;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--violetaoscuro);

    }
    div{
        margin:auto;
        width: 90%;
        display: grid;
        grid-template-columns: 20% 80%;
        margin-bottom: 1rem;
    }
    p{
        margin: 0;
        padding: 0; 
        font-weight: 700;

        span{
            color: var(--gris1);
            font-weight: 600;
        }
    }
`;
const TextoResultado = styled.p`
   margin: 0;  
   text-align: center;
   font-size: 3rem;
   font-weight: 900; 
   color: ${props => props.error ?  '#409343' : '#d13d47'};
`;

const BotonSubmit = styled.input`
    width:90%;
    padding: 1.5rem;
    background-color: var(--violetaoscuro);
    color: var(--blanco);
    border-style: none;
    border-radius: 8px;
    font-size: 1.5rem;
    font-weight: 600;
    display: block;
    margin: 1rem auto 1rem auto;
`;

const NUMERO_INTENTOS = 5;
let preguntaActual = 0;
let duracion = 60;
export const BatallaPeliculas = () => {

    const [statePreguntas] = useArrayPreguntas('batalla_peliculas', NUMERO_INTENTOS);
    const [statePeliculaActual, setPeliculaActual] = useState(null);
    const [segundos, reinicarTemporizador, setfinalizado, setComenzar, stateComenzar] = useTemporizador(45);
    const [formValue, handleInputChange, reset] = useForm({ tituloPelicula: '' });
    const [stateMostrarRespusta, setStateMostrarRespusta] = useState(null);

    const { tituloPelicula } = formValue;
    const [stateLoading, setstateLoading] = useState(false);
    const [guardarPuntaje] = useGuardarPuntaje();
    const [statePuntos, sumarPuntaje, enviarDataResultados] = usePuntajeJuego();

    const navigate = useNavigate();
    const audioRef = useRef(true);


    if (!statePreguntas) {
        return <Spinner />
    }

    const handleComenzarJuego = () => {

        if (preguntaActual < NUMERO_INTENTOS) {
            setstateLoading(true);
            setPeliculaActual(statePreguntas[preguntaActual].data);
            duracion = statePreguntas[preguntaActual].data.duracion;
            preguntaActual++;

            setComenzar(true);
            setTimeout(() => {
                setstateLoading(false);
                reinicarTemporizador(duracion);
            }, 2000);
        } else {
            guardarPuntaje(statePuntos.puntos);
            enviarDataResultados();
            navigate('/juegos/puntaje');
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        const respuestaJugador = useQuitarTildes(tituloPelicula);
        const tituloSinTildes = useQuitarTildes(statePeliculaActual.pelicula);
        const titleSinTildes = useQuitarTildes(statePeliculaActual.pelicula_original);

        if (respuestaJugador.toUpperCase() === tituloSinTildes.toUpperCase()) {
            handleMostrarRespustaCorrecta('correcto');
        } else if (respuestaJugador.toUpperCase() === titleSinTildes.toUpperCase()) {
            handleMostrarRespustaCorrecta('correcto');
        } else {

            handleMostrarRespustaCorrecta('incorrecto');
        }

    }

    const handleMostrarRespustaCorrecta = (resultado) => {
        setfinalizado(true);
        reset();

        if (resultado === 'correcto') {
            setStateMostrarRespusta({
                correcto: true,
                titulo: statePeliculaActual.pelicula,
                imagen: statePeliculaActual.portada
            });
            sumarPuntaje(500);
        } else {
            setStateMostrarRespusta({
                correcto: false,
                titulo: statePeliculaActual.pelicula,
                imagen: statePeliculaActual.portada
            });
        }

        setTimeout(() => {
            setStateMostrarRespusta(null);
            handleComenzarJuego();

        }, 5000);
    }

    if (segundos === 0) {
        reinicarTemporizador(100);
        handleMostrarRespustaCorrecta('incorrecto');
    }

    return (

        <ContendorJuego>
            <br /><br /><br />
            {
                (stateComenzar) ?
                    (
                        <ContendorPrincipal>
                            {
                                (statePeliculaActual) &&
                                (
                                    <>
                                        <CirculoTemporizador><p>{segundos}</p></CirculoTemporizador>
                                        <Imagen style={{ backgroundColor: `${statePeliculaActual.color_potada}` }}>
                                            {
                                                (stateLoading) ? <SpinnerSmall />
                                                    :
                                                    <>
                                                        {
                                                            (stateMostrarRespusta) ? <img src={stateMostrarRespusta.imagen} />
                                                                :
                                                                <img src={statePeliculaActual.portada_blur} />
                                                        }
                                                    </>
                                            }
                                        </Imagen>
                                        {(statePeliculaActual.modo_juego) && <h4>Modo de juego: <span>{statePeliculaActual.modo_juego}</span></h4>}
                                        <ContenedorDescripcionPeli>
                                            <audio src={(stateMostrarRespusta) ? '' : statePeliculaActual.audio} autoPlay />
                                            {
                                                (stateMostrarRespusta) ?

                                                    (<>
                                                        <TextoResultado
                                                            error={stateMostrarRespusta.correcto}
                                                        >{(stateMostrarRespusta.correcto) ? 'Correcto' : 'Incorrecto' }</TextoResultado>

                                                        <h3>{stateMostrarRespusta.titulo}</h3>
                                                    </>)

                                                    :
                                                    (<h3>Pelicula: Desconocida</h3>)
                                            }
                                            <div>
                                                <FcFilmReel size='3rem' />
                                                <p>Genero: <span> {statePeliculaActual.genero}</span> </p>
                                            </div>
                                            <div>
                                                <FcClapperboard size='3rem' />
                                                <p>Director: <span> {statePeliculaActual.director}</span></p>
                                            </div>
                                            <div>
                                                <FcCalendar size='3rem' />
                                                <p>Estreno: <span> {statePeliculaActual.fecha}</span> </p>
                                            </div>
                                        </ContenedorDescripcionPeli>
                                        <form onSubmit={handleSubmit}>
                                            {
                                                (!stateMostrarRespusta)
                                                &&
                                                (
                                                    <>
                                                        <InputRespusta
                                                            type='text'
                                                            placeholder='escribe el nombre de la pelicula'
                                                            name="tituloPelicula"
                                                            value={tituloPelicula}
                                                            onChange={handleInputChange}
                                                        />


                                                        <BotonSubmit
                                                            type='submit'
                                                            value='Confirmar respuesta'
                                                        />
                                                    </>
                                                )
                                            }

                                        </form>
                                        <br />
                                    </>
                                )
                            }

                        </ContendorPrincipal>
                    )
                    :
                    (
                        <InstriccionesJuego>
                            <h1>La batalla de las peliculas</h1>
                            <div>
                                <h3></h3>
                                <p>Vas a escuchar la reseña de una pelicula o serie, tenes que tratar de adivinar cuál es su nombre.</p>

                            </div>

                            <ul>
                                <li>Responder correctamente <span>500 puntos</span></li>
                                <li>Responder incorrectamente <span>0 puntos</span></li>
                            </ul>

                            <button onClick={handleComenzarJuego}>comenzar</button>
                        </InstriccionesJuego>
                    )

            }
            <br /><br />
        </ContendorJuego>


    )
}
