import { createSlice, PayloadAction, type Slice } from "@reduxjs/toolkit";
import { IProduct } from "@domains/Product";

export enum SortOrders {
    ASCENDING = "ascending",
    DESCENDING = "descending",
}

export const sortOrdersLabels: Record<SortOrders, string> = {
    [SortOrders.ASCENDING]: "acs",
    [SortOrders.DESCENDING]: "desc",
};

interface IProductsSliceState {
    category: keyof IProduct | null;
    sortOrder: SortOrders | null;
}

const initialState: IProductsSliceState = {
    category: null,
    sortOrder: null,
};

const sortOrders: SortOrders[] = [SortOrders.ASCENDING, SortOrders.DESCENDING];

const ProductsSlice: Slice<IProductsSliceState> = createSlice({
    name: "ProductsSlice",
    initialState,
    reducers: {
        updateSort: (state, action: PayloadAction<keyof IProduct>) => {
            if (!state.category) {
                state.category = action.payload;
                state.sortOrder = sortOrders[0];

                return;
            }

            const sortOrderIndex: number = sortOrders.findIndex(
                (order: SortOrders) => order === state.sortOrder,
            );

            if (sortOrderIndex === -1) {
                console.error("Incorrect sort order!");

                return;
            }

            if (sortOrderIndex === sortOrders.length - 1) {
                state.category = null;
                state.sortOrder = null;

                return;
            }

            state.sortOrder = sortOrders[sortOrderIndex + 1];
        },
        resetSort: (state, _action: PayloadAction<void>) => {
            state.category = null;
            state.sortOrder = null;
        },
    },
});

export const { updateSort, resetSort } = ProductsSlice.actions;
export default ProductsSlice.reducer;
