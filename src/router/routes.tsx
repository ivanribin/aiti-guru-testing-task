import ProductsPage from "@pages/Products";
import NotFoundPage from "@pages/NotFound";
import LoginPage from "@pages/Login";
import { type RouteObject } from "react-router";
import DefaultLayout from "@layouts/DefaultLayout";

export const paths = {
    PRODUCTS: {
        id: "products",
        path: "/",
    },
    LOGIN: {
        id: "login",
        path: "/login",
    },
    NOT_FOUND: {
        id: "notFound",
        path: "*",
    },
};

const routes: RouteObject[] = [
    {
        ...paths.LOGIN,
        element: <LoginPage />,
    },
    {
        ...paths.PRODUCTS,
        element: (
            <DefaultLayout>
                <ProductsPage />
            </DefaultLayout>
        ),
    },
    {
        ...paths.NOT_FOUND,
        element: <NotFoundPage />,
    },
];

export default routes;
