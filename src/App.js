import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAutenticacion } from './hooks/useAutenticacion';
import { firebase, firebaseContext } from './firebase/index';
import { Navbar } from './components/layout/Navbar';
import { Login } from './components/Login';
import { Registro } from './components/Registro';
import { DashboardRutas } from './components/rutas/DashboardRutasPrivadas';
import { RutaPrivada } from './components/rutas/RutasPrivadas';
import { Home } from './components/Home';
import { RutasJuegos } from './components/rutas/RutasJuegos';



function App() {

  const usuario = useAutenticacion();
  const [dataJuegos, setDataJuegos] = useState({ punto: 'cinco mill' });

  return (
    <firebaseContext.Provider
      value={{
        firebase,
        usuario,
        dataJuegos,
        setDataJuegos
      }}
    >

      <Router>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juegos/*" element={<RutasJuegos />} />
          <Route path="/ingresar" element={<Login />} />
          <Route path="registro" element={<Registro />} />

          <Route path="/*" element={
            <RutaPrivada>
              <DashboardRutas />
            </RutaPrivada>
          } />

        </Routes>

      </Router>

    </firebaseContext.Provider>
  );
}

export default App;
