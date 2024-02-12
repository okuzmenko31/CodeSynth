import Main from "../pages/Main";
import MakeOrder from "../pages/MakeOrder";
import PageNotFound from "../pages/PageNotFound";

import RouterWrapper from "./routerWrapper";

import { Route, Routes } from "react-router-dom";

const routerRoutes = [
    { path: "/", element: Main },
    { path: "/make_order", element: MakeOrder },
    { path: "/project/:project?", element: MakeOrder },
    { path: "*", element: PageNotFound },
];

const InitRoutes = () => (
    <RouterWrapper>
        <Routes>
            {routerRoutes &&
                routerRoutes.map((el: any, index: number) => (
                    <Route
                        key={index}
                        path={el.path}
                        element={<el.element />}
                    />
                ))}
        </Routes>
    </RouterWrapper>
);

export default InitRoutes;
