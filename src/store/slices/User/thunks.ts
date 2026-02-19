import API from "@api/index";
import ServerResponseParser from "@services/ServerResponseParser";
import { authTokenStore } from "@services/AuthTokensStore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiEndpoints } from "@utils/constants";
import type {
    ISignInUserCredentials,
    IUser,
    IUserSession,
} from "@domains/User";
import { delay } from "@utils/handlers";

export interface ISignInThunkParams extends ISignInUserCredentials {
    isRemember: boolean;
}

export const fetchUserSession = createAsyncThunk<IUser>(
    "user/fetchUserSession",
    async (_, { rejectWithValue }) => {
        try {
            // const response = await API.authenticatedApiRequest<
            //     IUserSession,
            //     void
            // >("get", ApiEndpoints.FETCH_SESSION, undefined);

            await delay(2000);

            const response = {
                id: 15,
                username: "kminchelle",
                email: "kminchelle@qq.com",
                firstName: "Jeanne",
                lastName: "Halvorson",
                gender: "female",
                image: "https://robohash.org/Jeanne.png?set=set4",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvSmVhbm5lLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcxMTIwOTAwMSwiZXhwIjoxNzExMjEyNjAxfQ.F_ZCpi2qdv97grmWiT3h7HcT1prRJasQXjUR4Nk1yo8",
            };

            const { token, ...user } = response;

            return user;
        } catch (error: unknown) {
            const serverErrorMessage: string =
                ServerResponseParser.getErrorMessage(error);

            return rejectWithValue(serverErrorMessage);
        }
    },
);

export const signIn = createAsyncThunk<IUser, ISignInThunkParams>(
    "user/signIn",
    async ({ isRemember, ...credentials }, { rejectWithValue }) => {
        try {
            // const response = await API.apiRequest<
            //     IUserSession,
            //     ISignInUserCredentials
            // >("post", ApiEndpoints.LOGIN, credentials);

            await delay(2000);

            const response = {
                id: 15,
                username: "kminchelle",
                email: "kminchelle@qq.com",
                firstName: "Jeanne",
                lastName: "Halvorson",
                gender: "female",
                image: "https://robohash.org/Jeanne.png?set=set4",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvSmVhbm5lLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcxMTIwOTAwMSwiZXhwIjoxNzExMjEyNjAxfQ.F_ZCpi2qdv97grmWiT3h7HcT1prRJasQXjUR4Nk1yo8",
            };

            const { token, ...user } = response;

            authTokenStore.setAccessToken(token, isRemember);

            return user;
        } catch (error: unknown) {
            const serverErrorMessage: string =
                ServerResponseParser.getErrorMessage(error);

            return rejectWithValue(serverErrorMessage);
        }
    },
);
