import EmptyItemsList from "@components/EmptyItemsList";
import ErrorDummyBlock from "@components/ErrorDummyBlock";
import emptyIcon from "@assets/icons/empty-list.svg?react";
import useProductsSorting from "@hooks/useProductsSorting";
import errorIcon from "@assets/icons/search-error.svg?react";
import ProductsTableSkeleton from "@components/ProductsTableSkeleton";
import ProductTableHeadWithSort from "@components/ProductTableHeadWithSort";
import { IProduct } from "@domains/Product";
import { ReactElement } from "react";

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
    const sortedProducts = useProductsSorting(products);

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

    if (!sortedProducts || !sortedProducts.length) {
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
                    <ProductTableHeadWithSort
                        category={"title"}
                        label="Наименование"
                    />
                    <ProductTableHeadWithSort
                        category={"brand"}
                        label="Вендор"
                    />
                    <ProductTableHeadWithSort
                        category={"rating"}
                        label="Оценка"
                    />
                    <ProductTableHeadWithSort category={"price"} label="Цена" />
                </tr>
            </thead>
            <tbody>
                {sortedProducts.map((product: IProduct) => (
                    <tr className="bold-text" key={product.id}>
                        {<span>{`${JSON.stringify(product.price)}`}</span>}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;
