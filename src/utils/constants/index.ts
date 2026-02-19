export type TApiMethods = "get" | "post" | "delete" | "put";

export const enum ApiEndpoints {
    LOGIN = "auth/login",
    REFRESH_TOKEN = "auth/refresh",
    FETCH_SESSION = "auth/me",
    PRODUCTS = "products",
    SEARCH = "search",
}

export const enum ApiQueryParams {
    SEARCH = "q",
    SKIP = "skip",
    LIMIT = "limit",
}

export const enum LocalStorageIds {
    ACCESS_TOKEN = "accessToken",
}

export const apiStatuses = {
    NOT_AUTHORIZED: 401,
};

export const enum AlertMessages {
    LOGIN = "You successfully Sign In!",
    PRODUCT_CREATED = "You successfully created Product!",
}

export const enum WeatherObservationTypes {
    PLACE = "place",
    FIELD = "field",
}

export const DELAY_BEFORE_SEND_REQUEST: number = 1000;

export const DELAY_REDIRECT_TO_HOME: number = 5000;

export const FIRST_SHEET_MODAL_Z_INDEX = 2;

export const enum ButtonTypes {
    GHOST = "ghost",
    OUTLINED = "outlined",
}

export const enum InputTypes {
    SECONDARY = "secondary",
}
