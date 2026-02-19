import { SortOrders } from "@store/slices/Products";
import { IProduct } from "@domains/Product";
import { TRootState } from "@store/index";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const useProductsSorting = (products: IProduct[] | undefined) => {
    const { category, sortOrder } = useSelector(
        (state: TRootState) => state.products,
    );

    const sortedProducts = useMemo(() => {
        if (!category || !sortOrder || !products?.length) {
            return products || [];
        }

        return [...products].sort((a: IProduct, b: IProduct) => {
            const valueA = a[category];
            const valueB = b[category];

            const compareResult =
                valueA < valueB ? -1 : valueA > valueB ? 1 : 0;

            return sortOrder === SortOrders.ASCENDING
                ? compareResult
                : -compareResult;
        });
    }, [products, category, sortOrder]);

    return sortedProducts;
};

export default useProductsSorting;
