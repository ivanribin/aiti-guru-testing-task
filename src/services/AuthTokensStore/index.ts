import { LocalStorageIds } from "@utils/constants";

class AuthTokenStore {
    private accessToken: string | null;

    constructor() {
        this.accessToken = null;
    }

    public setAccessToken(accessToken: string, remember: boolean): void {
        this.accessToken = accessToken;

        if (remember) {
            localStorage.setItem(LocalStorageIds.ACCESS_TOKEN, accessToken);
        }
    }

    public clearTokens(): void {
        this.accessToken = null;

        localStorage.removeItem(LocalStorageIds.ACCESS_TOKEN);
    }

    public getAccessToken(): string {
        return (
            this.accessToken ||
            localStorage.getItem(LocalStorageIds.ACCESS_TOKEN) ||
            ""
        );
    }
}

export const authTokenStore = new AuthTokenStore();
