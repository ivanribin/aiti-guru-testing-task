import axios from "axios";
import envVariables from "@utils/env";
import { authTokenStore } from "@services/AuthTokensStore";

export const axiosApi = axios.create({
    baseURL: envVariables.API_BASE_URL,
});

axiosApi.interceptors.request.use(
    (config) => {
        if (!config.url || !config.headers) {
            console.error(
                "You can't add tokens to axios interceptors without axios config url and headers!",
            );

            return config;
        }

        const accessToken = authTokenStore.getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);
