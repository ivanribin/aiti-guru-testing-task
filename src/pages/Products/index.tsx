import Paginator from "@components/Paginator";
import ProductsTable from "@components/ProductsTable";
import { IProductsListData } from "@domains/Product";
import usePaginationQuery, {
    TUseListQueryHook,
} from "@hooks/usePaginationQuery";
import {
    ILoadProductsPayload,
    useLoadProductsQuery,
} from "@store/api/Products";
import { ApiQueryParams } from "@utils/constants";
import { useMemo, type ReactElement } from "react";
import { useSearchParams } from "react-router";

type TProductsSearchQueryData = Partial<
    Pick<ILoadProductsPayload, "q" | "withSearch">
>;

const ProductsPage = (): ReactElement => {
    const [queryParams] = useSearchParams();

    const queryArgs: TProductsSearchQueryData = useMemo(() => {
        const search: string | null = queryParams.get(ApiQueryParams.SEARCH);

        if (!search) {
            return {};
        }

        return {
            [ApiQueryParams.SEARCH]: search,
            withSearch: true,
        };
    }, [queryParams]);

    const {
        data: loadedProducts,
        isLoading,
        isFetching,
        error,
        packsCount,
        refetch,
        selectPackNumber,
        selectedPackNumber,
    } = usePaginationQuery<
        TProductsSearchQueryData,
        IProductsListData,
        TUseListQueryHook<TProductsSearchQueryData, IProductsListData>
    >(useLoadProductsQuery, queryArgs);

    return (
        <div className="products-page">
            <h2>Products Page</h2>
            <ProductsTable
                products={loadedProducts?.products}
                isLoading={isLoading}
                isFetching={isFetching}
                error={error}
                reset={refetch}
            />
            {loadedProducts?.products.length && (
                <Paginator
                    selectedPack={selectedPackNumber}
                    setPack={selectPackNumber}
                    total={packsCount}
                />
            )}
        </div>
    );
};

export default ProductsPage;
