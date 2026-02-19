import { IProductsListData } from "@domains/Product";
import customBaseQuery from "../customBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndpoints, ApiQueryParams } from "@utils/constants";
import { IDefaultLoadListPayload } from "@app-types/index";

export interface ILoadProductsPayload extends IDefaultLoadListPayload {
    q?: string;
    withSearch?: boolean;
}

export const productsApi = createApi({
    reducerPath: "dayApi",
    baseQuery: customBaseQuery,
    tagTypes: ["products"],
    endpoints: (builder) => ({
        loadProducts: builder.query<IProductsListData, ILoadProductsPayload>({
            query: ({ q, withSearch, ...paginationParams }) => {
                const fullUrl: string = !withSearch
                    ? ApiEndpoints.PRODUCTS
                    : `${ApiEndpoints.PRODUCTS}/${ApiEndpoints.SEARCH}`;

                return {
                    method: "get",
                    url: fullUrl,
                    config: {
                        params: {
                            ...paginationParams,
                            [ApiQueryParams.SEARCH]: q,
                        },
                    },
                };
            },
            providesTags: ["products"],
        }),
    }),
});

export const { useLoadProductsQuery } = productsApi;
