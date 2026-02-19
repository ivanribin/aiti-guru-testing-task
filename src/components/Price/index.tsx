import { type ReactElement } from "react";
import "./style.css";

export interface IPriceProps {
    value: number;
    className?: string;
}

const Price = ({ value, className = "" }: IPriceProps): ReactElement => {
    const [integerPart, fractionalPart] = value.toFixed(2).split(".");

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return (
        <span className={`price ${className}`}>
            <span className="price-integer number-text">
                {formattedInteger}
            </span>
            {fractionalPart && (
                <span className="price-fractional number-text-secondary">
                    ,{fractionalPart}
                </span>
            )}
        </span>
    );
};

export default Price;
