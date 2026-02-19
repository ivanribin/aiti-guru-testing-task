import useInterval from "@hooks/useInterval";
import { useCallback, useState, type ReactElement } from "react";
import "./style.css";

export interface ITimerProps {
    endTime: number;
    interval: number;
    handleTimerCompletion: () => any;
}

const Timer = ({
    endTime,
    interval,
    handleTimerCompletion,
}: ITimerProps): ReactElement => {
    const [endTimeFromNow] = useState(
        () => Math.floor(Date.now() / 1000) + endTime
    );

    const getTimeNowInSeconds = useCallback((): number => {
        return Math.floor(Date.now() / 1000);
    }, []);

    const [displayTime, setDisplayTime] = useState<number>(endTime);
    const [delay, setDelay] = useState<number | null>(interval * 1000);

    const endTimeAction = (): void => {
        const currentTime = getTimeNowInSeconds();

        if (endTimeFromNow > currentTime) {
            setDisplayTime(endTimeFromNow - currentTime);

            return;
        }

        setDelay(null);
        handleTimerCompletion();
    };

    useInterval(endTimeAction, delay);

    return (
        <div className="timer">
            <p className="number">{displayTime}</p>
            <p className="title">s</p>
        </div>
    )
};

export default Timer;
