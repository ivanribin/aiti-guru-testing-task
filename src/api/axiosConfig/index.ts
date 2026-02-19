import axios from "axios";
import envVariables from "@utils/env";
import { authTokenStore } from "@services/AuthTokensStore";

export const axiosApi = axios.create({
    baseURL: envVariables.API_BASE_URL,
});

const REFRESH_REQUEST_ENDPOINT_SUFFIX: string = "refresh";

axiosApi.interceptors.request.use(
    (config) => {
        if (!config.url || !config.headers) {
            console.error(
                "You can't add tokens to axios interceptors without axios config url and headers!"
            );

            return config;
        }

        const currentToken: string = !config.url.endsWith(
            REFRESH_REQUEST_ENDPOINT_SUFFIX
        )
            ? authTokenStore.getAccessToken()
            : authTokenStore.getRefreshToken();

        if (currentToken) {
            config.headers.Authorization = `Bearer ${currentToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);
