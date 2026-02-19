import { ApiEndpoints, apiStatuses, type TApiMethods } from "@utils/constants";
import { AxiosError, AxiosResponse, type AxiosRequestConfig } from "axios";
import { authTokenStore } from "@services/AuthTokensStore";
import { IUserSession } from "@domains/User";
import { axiosApi } from "./axiosConfig";

class API {
    public static async apiRequest<TResponse, TBody>(
        method: TApiMethods,
        url: string,
        body?: TBody,
        config?: AxiosRequestConfig<TBody>,
    ): Promise<TResponse> {
        const response: AxiosResponse = await axiosApi.request({
            method,
            url,
            data: body,
            ...config,
        });

        return response.data;
    }

    public static async authenticatedApiRequest<TResponse, TBody>(
        method: TApiMethods,
        url: string,
        body?: TBody,
        config?: AxiosRequestConfig<TBody>,
    ): Promise<TResponse> {
        try {
            const response: TResponse = await this.apiRequest(
                method,
                url,
                body,
                {
                    ...config,
                },
            );

            return response;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;

            if (axiosError.response?.status !== apiStatuses.NOT_AUTHORIZED) {
                throw axiosError;
            }

            const refreshedTokensResponse: IUserSession = await this.apiRequest(
                "post",
                ApiEndpoints.REFRESH_TOKEN,
                undefined,
            );

            authTokenStore.setAccessToken(refreshedTokensResponse.token, true);

            return await this.apiRequest(method, url, body, config);
        }
    }
}

export default API;
