import { createSlice, PayloadAction, type Slice } from "@reduxjs/toolkit";

interface IApplicationSliceState {
    theme: object;
    isLoading: boolean;
    isBottomSheetOpened: boolean;
}

const initialState: IApplicationSliceState = {
    theme: {},
    isLoading: false,
    isBottomSheetOpened: false,
};

const ApplicationSlice: Slice<IApplicationSliceState> = createSlice({
    name: "ApplicationSlice",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<object>) => {
            state.theme = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setIsBottomSheetOpened: (state, action: PayloadAction<boolean>) => {
            state.isBottomSheetOpened = action.payload;
        },
    },
});

export const { setTheme, setIsLoading, setIsBottomSheetOpened } =
    ApplicationSlice.actions;
export default ApplicationSlice.reducer;
