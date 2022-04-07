import React, { useEffect, useRef } from 'react';

export const ReproductorAudio = ({srcCancion, reproduir}) => {

    const reproductorAudio =  useRef();
    
    const reproducirMusica = () => {
        if(reproduir){
            reproductorAudio.current.play();
        }/*else{
            reproductorAudio.current.pause();
        }*/
    }

    useEffect( () => {
        reproducirMusica();
    }, [reproduir, srcCancion]);

    return (
        <audio ref={reproductorAudio} src={srcCancion} />    
    )
}
