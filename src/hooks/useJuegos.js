import { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { firebaseContext } from '../firebase/index';

export const ContendorJuego = styled.div`
    height: 100vh;
    background-color: var(--violetaprincipal);
    margin: auto;
`;

export const CirculoTemporizador = styled.div`
    position:absolute;
    width: 80px;
    height: 80px;
    padding: 1rem;
    background-color: var(--blanco);
    border: 2px solid var(--violetaoscuro);
    border-radius: 100%;
    display:flex;
    justify-content:center;
    left:0;
    right:0;
    top:-40px;
    margin:auto;

    p{
        margin:0;
        padding:0;
        color: var(--violetaoscuro);
        font-size: 4rem;
        font-weight: 900;
    }
`;

export const InstriccionesJuego = styled.div`
    margin: auto;
    margin-bottom: 2rem;
    background-color: var(--blanco);
    width: 90%;
    max-width: 500px;
    align-items: center;
    text-align: center;
    border-radius: 10px;

    h1{
        font-size: 3rem;
        color: #000;
        margin: 2rem 0 1rem 0;
    }
    h3{
        margin: 1rem;
        font-size: 2.4rem;
        font-weight: 700;
    }

    div{
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid #e1e1e1;

        p{
            margin: 0;
            padding:0;
            font-size: 2rem;
            color: #595959;
        }
    }

    ul{
        margin: 1rem;
        padding: 1rem;
        border-radius: 8px;
        border: 1.5px solid #595959;
        font-weight: 700;
                
        li{
            font-size: 2rem;
            list-style: none;
            border-bottom: 1px solid #595959;
            &:last-of-type{
                border-bottom: none;
            }

            span{
                font-weight: 900;
                font-size: 2.2rem;
            }
        }
    }

    button{
        border-style: none;
        font-size: 2rem;
        padding: 1rem;
        background-color: var(--violetaprincipal);
        color: var(--blanco);
        border-radius: 5px;
        width: 80%;
        font-weight: 700;
        margin: 1rem;

    }
`;

export const InputRespusta = styled.input`
       padding: 1.5rem;
       border-radius: 5px;
       border-style: none;
       width: 90%;
       border: 1px solid var(--gris2);
       display: block;
       margin: auto;
       margin-bottom: 1rem;
       font-size: 1.5rem;
`; 

export const usePuntajeJuego = () => {
    const { setDataJuegos } = useContext(firebaseContext);
    const [puntos, setPuntos] = useState({puntos: 0, aciertos: 0 });
    
    const enviarDataResultados = () => {
        setDataJuegos(puntos);
    }

    const sumarPuntaje = (puntosSuma) => {
        setPuntos({
            puntos: puntos.puntos + puntosSuma,
            aciertos: puntos.aciertos + 1
        });
    } 

    return [puntos,sumarPuntaje, enviarDataResultados];
}

export const useArrayPreguntas = (coleccion, cantidad) => {

    const { firebase } = useContext(firebaseContext);
    const [statePreguntas, setstatePreguntas] = useState(null);

    useEffect(async () => {

        const arrayPrguntas = await firebase.consultarDocumentoDB(coleccion);

        const desordenado = desordenarPreguntas(arrayPrguntas, cantidad);
        setstatePreguntas(desordenado);

    }, []);

    return [statePreguntas];

}

export const useTemporizador = (duracion = 30) => {

    const [segundos, setstateTemporizador] = useState(parseInt(duracion));
    const [finalizado, setfinalizado] = useState(false);
    const [stateComenzar, setComenzar] = useState(false);
    let interval = null;
    useEffect(() => {

        if (stateComenzar) {
            interval = setInterval(() => {
                setstateTemporizador((segundos) => segundos - 1);
            }, 1000);

            if (segundos === 0 || finalizado) {
                clearInterval(interval);
            }

            return () => clearInterval(interval);
        }

    }, [segundos, stateComenzar]);

    const reinicarTemporizador = (duracion = 30) => {
        setfinalizado(false);
        setstateTemporizador(parseInt(duracion));
    }

    return [segundos, reinicarTemporizador, setfinalizado, setComenzar, stateComenzar];
}

export const useGuardarPuntaje = () => {
    const { usuario, firebase } = useContext(firebaseContext);
    
    const guardarPuntaje = async(data) => {
        
        if(usuario){
            if(usuario.ok){
                const puntaje = parseInt(data);
                const resp = await firebase.actualizarDocumentoPorId('usuarios', usuario.usuario.uid, {campo: 'puntaje', valor: puntaje});
                console.log(resp);
            }
        }else{
            console.log('no logeado');
        }
    }

    return [guardarPuntaje];
}

export const useQuitarTildes = (cadena) => {
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

const desordenarPreguntas = (arrayPreguntas, cantidad) => {
    const desordenado = arrayPreguntas.sort(() => Math.random() - 0.5);

    return desordenado.slice(0, cantidad);
}
