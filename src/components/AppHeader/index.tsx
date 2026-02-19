import ProductsSearch from "@components/ProductsSearch";
import { InputTypes } from "@utils/constants";
import { ReactElement } from "react";
import "./style.css";

const AppHeader = (): ReactElement => {
    return (
        <header className="app-header">
            <h2>Товары</h2>
            <div className="product-search-wrapper">
                <ProductsSearch
                    style={{ width: "100%" }}
                    className={`description-text ${InputTypes.SECONDARY}`}
                />
            </div>
        </header>
    );
};

export default AppHeader;
