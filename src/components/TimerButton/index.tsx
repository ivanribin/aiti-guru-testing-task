import Timer from "@components/Timer";
import { useState, type ReactElement } from "react";
import "./style.css";

export interface ITimerButton {
    label: string;
    onClick: () => void | Promise<void>;
    timerWaiting?: number;
    timerInterval?: number;
    loading?: boolean;
}

const TIMER_BUTTON_WAITING_IN_SECONDS = 3;
const TIMER_BUTTON_INTERVAL = 1;

const TimerButton = ({
    label,
    onClick,
    timerWaiting = TIMER_BUTTON_WAITING_IN_SECONDS,
    timerInterval = TIMER_BUTTON_INTERVAL,
}: ITimerButton): ReactElement => {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const removeDisabled = (): void => {
        setIsDisabled(false);
    };

    const handleClick = (): void => {
        onClick();

        setIsDisabled(true);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isDisabled}
            className="timer-button"
        >
            <span className="body-text">{label}</span>
            {isDisabled && (
                <Timer
                    endTime={timerWaiting}
                    interval={timerInterval}
                    handleTimerCompletion={removeDisabled}
                />
            )}
        </button>
    );
};

export default TimerButton;
