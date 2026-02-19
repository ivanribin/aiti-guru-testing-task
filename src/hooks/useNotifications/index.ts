import IdService from "@services/IdService";
import IAlertData, { type IAlertOptions } from "@domains/Alert";
import { addAlert, removeAlertById } from "@store/slices/Notifications";
import { type TApplicationDispatch } from "@store/index";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export const DEFAULT_ALERT_TIMEOUT: number = 2000;

type TCreateAlert = { createAlert: (alertOptions: IAlertOptions) => void };

const useNotifications = (): TCreateAlert => {
    const dispatch = useDispatch<TApplicationDispatch>();

    const createAlert = useCallback(
        (alertOptions: IAlertOptions): void => {
            const alertID: string = IdService.generateUniqueId();

            const timeout: number =
                !alertOptions.timeout || alertOptions.timeout < 0
                    ? DEFAULT_ALERT_TIMEOUT
                    : alertOptions.timeout;

            setTimeout(() => {
                dispatch(removeAlertById(alertID));
            }, timeout);

            const alertData: IAlertData = {
                id: alertID,
                ...alertOptions,
            };

            dispatch(addAlert(alertData));
        },
        [dispatch]
    );

    return { createAlert };
};

export default useNotifications;
