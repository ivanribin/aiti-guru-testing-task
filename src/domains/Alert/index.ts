import { AlertTypes } from "@components/Alert";

export interface IAlertOptions {
    message: string;
    type: AlertTypes;
    title?: string;
    timeout?: number;
}

export default interface IAlertData {
    id: string;
    message: string;
    type: AlertTypes;
    title?: string;
    timeout?: number;
}
