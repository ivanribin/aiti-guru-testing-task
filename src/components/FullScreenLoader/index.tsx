import { type ReactElement } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import "./style.css";

const FullScreenLoader = (): ReactElement => {
    return (
        <div className="full-screen-loader-wrapper">
            {/* <Spinner size={SpinnerSizes.LARGE} /> */}
            <ProgressSpinner />
        </div>
    );
};

export default FullScreenLoader;
