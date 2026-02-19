import Alert from "@components/Alert";
import { removeAlertById, type TAlert } from "@store/slices/Notifications";
import { type TApplicationDispatch, TRootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import { type ReactElement } from "react";
import "./style.css";

const AlertsHolder = (): ReactElement => {
    const dispatch = useDispatch<TApplicationDispatch>();

    const alerts: Array<TAlert> = useSelector(
        (state: TRootState) => state.notifications.alerts,
    );

    const handleClose = (id: string): void => {
        dispatch(removeAlertById(id));
    };

    return (
        <div className="alerts-holder">
            {alerts.map((alert: TAlert) => (
                <div key={alert.id} className={`alert-wrapper`}>
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => handleClose(alert.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default AlertsHolder;
