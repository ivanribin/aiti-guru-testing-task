import { createSlice, type PayloadAction, type Slice } from "@reduxjs/toolkit";
import { IUser, type IUserSession } from "@domains/User";
import { fetchUserSession, signIn } from "./thunks";

interface IUserSliceState {
    isUserAuthorized: boolean;
    isTryAuthorization: boolean;
    isUserDataLoading: boolean;
    session: IUser | null;
}

const initialState: IUserSliceState = {
    isUserAuthorized: false,
    isTryAuthorization: false,
    isUserDataLoading: false,
    session: null,
};

const UserSlice: Slice<IUserSliceState> = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        setIsUserAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isUserAuthorized = action.payload;
        },
        setIsTryAuthorization: (state, action: PayloadAction<boolean>) => {
            state.isTryAuthorization = action.payload;
        },
        setIsUserDataLoading: (state, action: PayloadAction<boolean>) => {
            state.isUserDataLoading = action.payload;
        },
        updateSession: (state, action: PayloadAction<IUserSession>) => {
            state.session = action.payload;
        },
        removeSession: (state, _action: PayloadAction<null>) => {
            state.session = null;
            state.isUserAuthorized = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchUserSession.fulfilled,
            (state, action: PayloadAction<IUser>) => {
                state.session = action.payload;
                state.isUserAuthorized = true;
            },
        );
        builder.addCase(
            signIn.fulfilled,
            (state, action: PayloadAction<IUser>) => {
                state.session = action.payload;
                state.isUserAuthorized = true;
            },
        );
    },
});

export const {
    setIsUserDataLoading,
    setIsTryAuthorization,
    setIsLoading,
    updateSession,
    removeSession,
} = UserSlice.actions;
export default UserSlice.reducer;
