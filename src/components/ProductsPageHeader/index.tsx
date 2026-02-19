import ReloadIcon from "@assets/icons/reload.svg?react";
import AddProductButton from "@components/AddProductButton";
import { ReactElement, MouseEvent } from "react";
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
            <Button onClick={onReload} loading={isLoading}>
                <ReloadIcon className="action-icon" />
            </Button>
            <AddProductButton />
        </div>
    );
};

export default ProductsPageHeader;
