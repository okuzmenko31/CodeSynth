import React from 'react';

import Main from './pages/Main';
import PageNotFound from './pages/PageNotFound';
import MakeOrder from './pages/MakeOrder';
import Admin from './pages/Admin';


import { Routes, Route } from 'react-router-dom';

const routerRoutes = [
    { path: "/", element: Main },
    { path: "/make_order", element: MakeOrder },
    { path: "/project/:project?", element: MakeOrder },
    { path: "/admin/:category?/:action?/:id?", element: Admin },
    { path: "*", element: PageNotFound },
];

const InitRoutes = () => (
    <Routes>
        {routerRoutes &&
            routerRoutes.map((el: any, index: number) => (
                <Route key={index} path={el.path} element={<el.element />} />
            ))
        }
    </Routes>
);

export default InitRoutes;
