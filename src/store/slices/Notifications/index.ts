import { createSlice, type PayloadAction, type Slice } from "@reduxjs/toolkit";
import { AlertTypes } from "@components/Alert";

export type TAlert = {
    id: string;
    message: string;
    type: AlertTypes;
    title?: string;
    timeout?: number;
};

type TAlertToDelete = TAlert | undefined;

interface INotificationsSlice {
    alerts: TAlert[];
}

const initialState: INotificationsSlice = {
    alerts: [],
};

export const notificationSlice: Slice<INotificationsSlice> = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<TAlert>) => {
            const currentAlertList: TAlert[] = [...state.alerts];

            currentAlertList.unshift(action.payload);

            state.alerts = currentAlertList;
        },
        removeAlertById: (state, action: PayloadAction<string>) => {
            const currentAlertList: TAlert[] = [...state.alerts];

            const alertToDelete: TAlertToDelete = currentAlertList.find(
                (alert: TAlert) => alert.id === action.payload,
            );

            if (!alertToDelete) {
                return;
            }

            currentAlertList.splice(currentAlertList.indexOf(alertToDelete), 1);

            state.alerts = currentAlertList;
        },
    },
});

export const { addAlert, removeAlertById } = notificationSlice.actions;
export default notificationSlice.reducer;
