import usePaginationQuery, {
    TUseListQueryHook,
} from "@hooks/usePaginationQuery";
import Paginator from "@components/Paginator";
import ProductsTable from "@components/ProductsTable";
import PaginationInfo from "@components/PaginationInfo";
import ProductsPageHeader from "@components/ProductsPageHeader";
import { IProductsListData } from "@domains/Product";
import { useMemo, type ReactElement } from "react";
import { ApiQueryParams } from "@utils/constants";
import { useSearchParams } from "react-router";
import {
    ILoadProductsPayload,
    useLoadProductsQuery,
} from "@store/api/Products";
import "./style.css";

type TProductsSearchQueryData = Partial<
    Pick<ILoadProductsPayload, "q" | "withSearch">
>;

const PRODUCTS_COUNT_ON_PAGE: number = 15;

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
        refetch,
        selectPackNumber,
        packsCount,
        total,
        selectedPackNumber,
    } = usePaginationQuery<
        TProductsSearchQueryData,
        IProductsListData,
        TUseListQueryHook<TProductsSearchQueryData, IProductsListData>
    >(useLoadProductsQuery, queryArgs, PRODUCTS_COUNT_ON_PAGE);

    return (
        <div className="products-page page">
            <ProductsPageHeader
                refetchProducts={refetch}
                isLoading={isLoading || isFetching}
            />
            <ProductsTable
                products={loadedProducts?.products}
                isLoading={isLoading}
                isFetching={isFetching}
                error={error}
                reset={refetch}
            />
            {loadedProducts?.products.length && total && (
                <div className="products-page-pagination-block">
                    <PaginationInfo
                        selectedPack={selectedPackNumber}
                        packItemsCount={PRODUCTS_COUNT_ON_PAGE}
                        total={total}
                    />
                    <Paginator
                        selectedPack={selectedPackNumber}
                        setPack={selectPackNumber}
                        total={packsCount}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
