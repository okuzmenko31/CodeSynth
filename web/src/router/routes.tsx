import Main from "../pages/Main";
import MakeOrder from "../pages/MakeOrder";
import PageNotFound from "../pages/PageNotFound";

import RouterWrapper from "./routerWrapper";

import { Route, Routes } from "react-router-dom";

export const paths = {
    main: "/",
    makeOrder: "/make-order",
    project: "/project/:project?",
};

const routerRoutes = [
    { path: paths.main, element: Main },
    { path: paths.makeOrder, element: MakeOrder },
    { path: paths.project, element: MakeOrder },
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
