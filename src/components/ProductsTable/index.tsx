import ErrorDummyBlock from "@components/ErrorDummyBlock";
import emptyIcon from "@assets/icons/empty-list.svg?react";
import errorIcon from "@assets/icons/search-error.svg?react";
import { IProduct } from "@domains/Product";
import { ReactElement } from "react";
import EmptyItemsList from "@components/EmptyItemsList";
import ProductsTableSkeleton from "@components/ProductsTableSkeleton";

export interface IProductsTableProps {
    isLoading?: boolean;
    isFetching?: boolean;
    error?: Error | undefined;
    reset: () => void;
    products: IProduct[] | undefined;
}

const ProductsTable = ({
    isLoading,
    isFetching,
    error,
    reset,
    products,
}: IProductsTableProps): ReactElement => {
    if (isLoading || isFetching) {
        return <ProductsTableSkeleton />;
    }

    if (error) {
        return (
            <ErrorDummyBlock
                Icon={errorIcon}
                title="Oops..."
                description="Error receiving time slots"
                onRefresh={reset}
            />
        );
    }

    if (!products || !products.length) {
        return (
            <EmptyItemsList
                Icon={emptyIcon}
                title="There are no products"
                description="Please check back later"
            />
        );
    }

    return (
        <table className="products-table entities-table">
            <thead>
                <tr className="head-row">
                    <th>{`Наименование`}</th>
                    <th>{`Вендор`}</th>
                    <th>{`Оценка`}</th>
                    <th>{`Цена`}</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product: IProduct) => (
                    <tr className="bold-text" key={product.id}>
                        {JSON.stringify(product)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;
