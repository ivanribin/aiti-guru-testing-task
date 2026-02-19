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

            if (valueA < valueB) {
                return sortOrder === SortOrders.ASCENDING ? -1 : 1;
            }

            if (valueA > valueB) {
                return sortOrder === SortOrders.DESCENDING ? 1 : -1;
            }

            return 0;
        });
    }, [products, category, sortOrder]);

    return sortedProducts;
};

export default useProductsSorting;
