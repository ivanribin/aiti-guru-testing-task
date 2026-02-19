import { AxiosError } from "axios";

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
