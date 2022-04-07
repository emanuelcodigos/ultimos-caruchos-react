import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MisAjustes } from '../MisAjustes';

export const DashboardRutas = () => {

    return (
        <Routes>
            <Route path="cuenta" element={<MisAjustes />} />
        </Routes>
    );
}
