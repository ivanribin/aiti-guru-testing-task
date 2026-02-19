import ReloadIcon from "@assets/icons/reload.svg?react";
import AddProductButton from "@components/AddProductButton";
import { ReactElement, MouseEvent } from "react";
import { ButtonTypes } from "@utils/constants";
import { Button } from "primereact/button";
import "./style.css";

export interface IProductsPageHeaderProps {
    refetchProducts: () => void;
    isLoading: boolean;
}

const ProductsPageHeader = ({
    refetchProducts,
    isLoading,
}: IProductsPageHeaderProps): ReactElement => {
    const onReload = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();

        refetchProducts();
    };

    return (
        <div className="products-page-header">
            <h3>Все позиции</h3>
            <div className="products-actions">
                <Button
                    onClick={onReload}
                    className={ButtonTypes.OUTLINED}
                    loading={isLoading}
                >
                    <ReloadIcon className="action-icon" />
                </Button>
                <AddProductButton />
            </div>
        </div>
    );
};

export default ProductsPageHeader;
