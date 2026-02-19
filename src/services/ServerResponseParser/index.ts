import type { IUserSession } from "@domains/User";
import { AxiosError } from "axios";

export interface IServerTokens {
    accessToken: string;
    refreshToken: string;
}

export interface IDefaultServerResponse {
    ok: boolean;
    message: string;
}

export interface IServerAuthorizationResponse {
    tokens: IServerTokens;
    meta: IUserSession;
}

export interface IServerDataResponse<T> {
    meta: T;
}

export interface ITokensServerResponse {
    tokens: IServerTokens;
}

export interface IServerError {
    message: string;
}

class ServerResponseParser {
    public static getErrorMessage = (error: unknown): string => {
        const axiosError = error as AxiosError;

        if (!axiosError.response) {
            return "Unexpected server error";
        }

        const errorResponse = axiosError.response.data as IServerError;

        return errorResponse.message;
    };
}

export default ServerResponseParser;
