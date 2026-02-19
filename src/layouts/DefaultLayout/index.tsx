import AppHeader from "@components/AppHeader";
import ProtectedRoute from "@components/ProtectedRoute";
import { PropsWithChildren, ReactElement } from "react";
import "./style.css";

const DefaultLayout = ({ children }: PropsWithChildren): ReactElement => {
    return (
        <ProtectedRoute>
            <div className="default-layout">
                <AppHeader />
                <div className="content">{children}</div>
            </div>
        </ProtectedRoute>
    );
};

export default DefaultLayout;
