import ProtectedRoute from "@components/ProtectedRoute";
import { PropsWithChildren, ReactElement } from "react";
import ProductsSearch from "@components/ProductsSearch";
import "./style.css";

const DefaultLayout = ({ children }: PropsWithChildren): ReactElement => {
    return (
        <ProtectedRoute>
            <div className="default-layout">
                <header className="default-layout">
                    <div className="header-main">
                        <h2>Товары</h2>
                        <ProductsSearch />
                    </div>
                </header>
                <div className="content">{children}</div>
            </div>
        </ProtectedRoute>
    );
};

export default DefaultLayout;
