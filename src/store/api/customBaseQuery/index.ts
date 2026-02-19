import API from "@api/index";
import ServerResponseParser from "@services/ServerResponseParser";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { type TApiMethods } from "@utils/constants";
import { AxiosRequestConfig } from "axios";

interface CustomQueryArgs {
    url: string;
    method?: TApiMethods;
    body?: unknown;
    config?: AxiosRequestConfig;
}

type CustomBaseQueryError = {
    message: string;
};

const customBaseQuery: BaseQueryFn<
    CustomQueryArgs,
    unknown,
    CustomBaseQueryError
> = async ({ url, method = "get", body, config }) => {
    try {
        const serverResponse: unknown = await API.authenticatedApiRequest<
            unknown,
            unknown
        >(method, url, body, config);

        return { data: serverResponse };
    } catch (error: unknown) {
        const serverErrorMessage: string =
            ServerResponseParser.getErrorMessage(error);

        return {
            error: {
                message: serverErrorMessage,
            },
        };
    }
};

export default customBaseQuery;
