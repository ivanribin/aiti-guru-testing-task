import ApplicationRoutes from "@router/index";
import AlertsHolder from "@components/AlertsHolder";
import FullScreenLoader from "@components/FullScreenLoader";
import DesignSystemProvider from "@components/DesignSystemProvider";
import { type TRootState } from "@store/index";
import { BrowserRouter } from "react-router";
import { type ReactElement } from "react";
import { useSelector } from "react-redux";
import "@design-system/customDesignSystemClassnames.css";
import "@domains/Theme/projectRoot.css";
import "@domains/Theme/typographic.css";

const App = (): ReactElement => {
    const isLoading: boolean = useSelector(
        (state: TRootState) => state.application.isLoading,
    );

    return (
        <DesignSystemProvider>
            <BrowserRouter>
                <ApplicationRoutes />
                <AlertsHolder />
                {isLoading && <FullScreenLoader />}
            </BrowserRouter>
        </DesignSystemProvider>
    );
};

export default App;
