import Timer from "@components/Timer";
import TimerButton from "@components/TimerButton";
import { TSvgComponent } from "@app-types/svgComponent";
import { ReactElement } from "react";
import "./style.css";

interface IErrorDummyBlockProps {
    Icon: TSvgComponent;
    title: string;
    description: string;
    onRefresh: () => void;
    labelButton?: string;
    timeBeforeRefresh?: number;
    timerInterval?: number;
}

const DEFAULT_LABEL_BUTTON: string = "Try again";
const TIME_BUTTON_WAITING_IN_SECS: number = 10;
const TIME_WAITING_IN_SECS: number = 30;
const TIMER_INTERVAL: number = 1;

const ErrorDummyBlock = ({
    Icon,
    title,
    description,
    onRefresh,
    labelButton = DEFAULT_LABEL_BUTTON,
    timeBeforeRefresh = TIME_WAITING_IN_SECS,
    timerInterval = TIMER_INTERVAL,
}: IErrorDummyBlockProps): ReactElement => {
    return (
        <div className={`error-dummy-block`}>
            <div className="error-block-image-wrapper">
                <Icon className="error-icon " />
            </div>

            <div className="error-block-info">
                <h1 className="error-block-title bold-text">{title}</h1>
                <span className="error-block-description">{description}</span>
            </div>

            <TimerButton
                timerWaiting={TIME_BUTTON_WAITING_IN_SECS}
                timerInterval={timerInterval}
                onClick={onRefresh}
                label={labelButton}
            />

            <div className="hidden-timer-block">
                <Timer
                    handleTimerCompletion={onRefresh}
                    endTime={timeBeforeRefresh}
                    interval={timerInterval}
                />
            </div>
        </div>
    );
};

export default ErrorDummyBlock;
