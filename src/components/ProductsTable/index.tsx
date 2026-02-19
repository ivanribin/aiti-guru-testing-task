import EmptyItemsList from "@components/EmptyItemsList";
import ErrorDummyBlock from "@components/ErrorDummyBlock";
import ProductTableRow from "@components/ProductsTableRow";
import emptyIcon from "@assets/icons/empty-list.svg?react";
import useProductsSorting from "@hooks/useProductsSorting";
import errorIcon from "@assets/icons/search-error.svg?react";
import ProductsTableSkeleton from "@components/ProductsTableSkeleton";
import ProductTableHeadWithSort from "@components/ProductTableHeadWithSort";
import { CSSProperties, ReactElement } from "react";
import { IProduct } from "@domains/Product";
import "./style.css";

export interface IProductsTableProps {
    isLoading?: boolean;
    isFetching?: boolean;
    error?: Error | undefined;
    reset: () => void;
    products: IProduct[] | undefined;
    style?: CSSProperties;
}

const ProductsTable = ({
    isLoading,
    isFetching,
    error,
    reset,
    products,
    style,
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
        <table className="products-table" style={{ marginBottom: "2.2rem" }}>
            <thead>
                <tr className="head-row">
                    <ProductTableHeadWithSort
                        category={"title"}
                        label="Наименование"
                        className="col-title"
                    />
                    <ProductTableHeadWithSort
                        category={"brand"}
                        label="Вендор"
                        className="col-brand"
                    />
                    <ProductTableHeadWithSort
                        category={"sku"}
                        label="Артикул"
                        className="col-sku"
                    />
                    <ProductTableHeadWithSort
                        category={"rating"}
                        label="Оценка"
                        className="col-rating"
                    />
                    <ProductTableHeadWithSort
                        category={"price"}
                        label="Цена, ₽"
                        className="col-price"
                    />
                </tr>
            </thead>
            <tbody>
                {sortedProducts.map((product: IProduct) => (
                    <ProductTableRow key={product.id} product={product} />
                ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;
