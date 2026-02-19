import InfoIcon from "@assets/icons/default-info-icon.svg?react";
import ErrorIcon from "@assets/icons/default-error-icon.svg?react";
import WarningIcon from "@assets/icons/default-warning-icon.svg?react";
import SuccessIcon from "@assets/icons/default-success-icon.svg?react";
import { CSSProperties, Fragment, ReactNode, type ReactElement } from "react";
import { TSvgComponent } from "@app-types/svgComponent";
import "./style.css";

export enum AlertTypes {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
}

export interface IAlertProps {
    message: ReactNode;
    type: AlertTypes;
    className?: string;
    style?: CSSProperties;
    icon?: ReactNode;
    onClose?: () => void;
}

const iconMap: Record<AlertTypes, TSvgComponent> = {
    [AlertTypes.INFO]: InfoIcon,
    [AlertTypes.SUCCESS]: SuccessIcon,
    [AlertTypes.WARNING]: WarningIcon,
    [AlertTypes.ERROR]: ErrorIcon,
};

const DEFAULT_ICON_SIZE_IN_PIXELS: string = "14";

const Alert = ({
    message,
    type = AlertTypes.INFO,
    className = "",
    style,
    icon,
    onClose,
}: IAlertProps): ReactElement => {
    const DefaultIcon: TSvgComponent = iconMap[type];

    return (
        <div className={`alert  ${type} ${className}`} style={style}>
            <span className={`alert-icon`}>
                {!icon && (
                    <DefaultIcon
                        width={DEFAULT_ICON_SIZE_IN_PIXELS}
                        height={DEFAULT_ICON_SIZE_IN_PIXELS}
                    />
                )}
                {!!icon && <Fragment>{icon}</Fragment>}
            </span>
            <span className={`alert-message`}>{message}</span>
            {onClose && (
                <button
                    className={`alert-close`}
                    onClick={onClose}
                    aria-label="Close"
                    title="Close"
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default Alert;
