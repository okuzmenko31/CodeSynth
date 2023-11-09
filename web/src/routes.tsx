import React from 'react';
import PageNotFound from './pages/PageNotFound';
import Main from './pages/Main';
import { Routes, Route } from 'react-router-dom';

const InitRoutes = () => (
    <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="*" element={<PageNotFound />}/>
    </Routes>
)

export default InitRoutes;
