import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdivinaUt } from '../juegos/AdivinaUt';
import { BatallaPeliculas } from '../juegos/BatallaPeliculas';
import { CosasNoSabias } from '../juegos/CosasNoSabias';
import { Personajes } from '../juegos/Personajes';
import { Puntaje } from '../juegos/Puntaje';

export const RutasJuegos = () => {
    return (
        <>
            <Routes>
                <Route path='puntaje' element={<Puntaje/>} />
                <Route path='adivina-ut' element={<AdivinaUt/>} />
                <Route path='batalla-peliculas' element={<BatallaPeliculas/>} />
                <Route path='personajes' element={<Personajes/>} />
                <Route path='no-sabias' element={<CosasNoSabias/>} />

            </Routes>
        </>
    )
}
