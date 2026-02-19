import { DELAY_REDIRECT_TO_HOME } from "@utils/constants";
import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { paths } from "@router/routes";
import "./style.css";

const NotFoundPage = (): ReactElement => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate(paths.PRODUCTS.path);
        }, DELAY_REDIRECT_TO_HOME);

        return () => {
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <div className="not-found-page-block">
            <div className="not-found-page">
                <h1 className="not-found-page-header">404 - Page not found</h1>
                <p className="primary-text">
                    Sorry, the page you requested does not exist.
                </p>
                <p className="primary-text">
                    You will be redirected to the main page in 5 seconds.
                </p>
                <Button
                    className="tertiary-text"
                    label="Return to home page"
                    onClick={() => navigate(paths.PRODUCTS.path)}
                />
            </div>
        </div>
    );
};

export default NotFoundPage;
