import ApplicationRoutes from "@router/index";
import AlertsHolder from "@components/AlertsHolder";
import FullScreenLoader from "@components/FullScreenLoader";
import { type TRootState } from "@store/index";
import { BrowserRouter } from "react-router";
import { type ReactElement } from "react";
import { useSelector } from "react-redux";
import "@domains/Theme/designSystemRoot.css";
import "@domains/Theme/projectRoot.css";
import "@domains/Theme/typographic.css";

const App = (): ReactElement => {
    const isLoading: boolean = useSelector(
        (state: TRootState) => state.application.isLoading,
    );

    return (
        <BrowserRouter>
            <ApplicationRoutes />
            <AlertsHolder />
            {isLoading && <FullScreenLoader />}
        </BrowserRouter>
    );
};

export default App;
