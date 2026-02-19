export interface IUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export interface IUserSession extends IUser {
    token: string;
}

export interface ISignInUserCredentials {
    username: string;
    password: string;
}
