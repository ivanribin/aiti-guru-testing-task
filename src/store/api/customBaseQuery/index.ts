import API from "@api/index";
import ServerResponseParser, {
    IServerDataResponse,
} from "@services/ServerResponseParser";
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
        const serverResponse: IServerDataResponse<unknown> =
            await API.authenticatedApiRequest<
                IServerDataResponse<unknown>,
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
