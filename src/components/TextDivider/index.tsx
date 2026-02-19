import { ReactElement } from "react";
import "./style.css";

export interface ITextDividerProps {
    text: string;
}

const TextDivider = ({ text }: ITextDividerProps): ReactElement => {
    return (
        <span className="text-divider">
            <hr />
            <span className="caption-text">{text}</span>
            <hr />
        </span>
    );
};

export default TextDivider;
