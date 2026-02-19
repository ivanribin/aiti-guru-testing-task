import { InputText, InputTextProps } from "primereact/inputtext";
import {
    ChangeEvent,
    type ReactElement,
    useCallback,
    useMemo,
    useState,
} from "react";

export interface INumberInputProps extends Omit<
    InputTextProps,
    "onChange" | "value"
> {
    value: number | undefined;
    onChange: (value: number) => void;
    isFloat?: boolean;
    regExp?: RegExp;
    validator?: (value: string) => boolean;
}

const transformStringToNumber = (query: string): number => {
    const transformedValue: number = parseFloat(query.replace(",", "."));

    return Number.isNaN(transformedValue) ? 0 : transformedValue;
};

const getIncludeStringCount = (query: string, symbolList: string[]): number => {
    return query.split("").reduce((accumulator: number, char: string) => {
        if (symbolList.includes(char)) {
            return accumulator + 1;
        }

        return accumulator;
    }, 0);
};

const NumberInput = ({
    value,
    onChange,
    regExp,
    isFloat = false,
    validator,
    ...inputProps
}: INumberInputProps): ReactElement => {
    const [inputValue, setInputValue] = useState<string>(
        value !== undefined ? String(value) : "",
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            let newValue: string = event.target.value;

            const lastSymbol: string = newValue[newValue.length - 1];

            if (!newValue) {
                setInputValue(newValue);
                onChange(0);
            }

            if (!/[\d-,.]/.test(lastSymbol)) {
                return;
            }

            if (getIncludeStringCount(newValue, ["-"]) > 1) {
                return;
            }

            if (lastSymbol === "-" && newValue.length === 1) {
                setInputValue("");
                onChange(0);

                return;
            }

            if (lastSymbol === "-") {
                const updatedNegativeValue =
                    "-" + newValue.slice(0, newValue.length - 1);

                if (
                    (regExp && !regExp.test(updatedNegativeValue)) ||
                    (validator && !validator(updatedNegativeValue))
                ) {
                    return;
                }

                setInputValue(updatedNegativeValue);
                onChange(transformStringToNumber(updatedNegativeValue));

                return;
            }

            if (!isFloat && (lastSymbol === "," || lastSymbol === ".")) {
                return;
            }

            if (
                getIncludeStringCount(newValue, [",", "."]) > 1 &&
                (lastSymbol === "," || lastSymbol === ".")
            ) {
                return;
            }

            if (
                (regExp && !regExp.test(newValue)) ||
                (validator && !validator(newValue))
            ) {
                return;
            }

            if (lastSymbol === "," || lastSymbol === ".") {
                setInputValue(newValue);
                onChange(
                    transformStringToNumber(
                        newValue.slice(0, newValue.length - 1),
                    ),
                );

                return;
            }

            if (
                newValue.startsWith("0") &&
                newValue.length > 1 &&
                getIncludeStringCount(newValue, [",", "."]) === 0
            ) {
                newValue = newValue.slice(1);
            }

            if (!isFloat) {
                setInputValue(newValue);
                onChange(transformStringToNumber(newValue));

                return;
            }

            let processedValue = newValue;

            if (lastSymbol === "." || lastSymbol === ",") {
                processedValue = newValue + "0";
            }

            setInputValue(processedValue);
            onChange(transformStringToNumber(processedValue));

            if (lastSymbol === "." || lastSymbol === ",") {
                return;
            }

            setInputValue(processedValue);
            onChange(transformStringToNumber(processedValue.replace(",", ".")));
        },
        [setInputValue, onChange, regExp, validator, isFloat],
    );

    const mergedProps: InputTextProps = useMemo(
        () => ({
            ...inputProps,
            value: inputValue,
            onChange: handleChange,
        }),
        [inputProps, inputValue, handleChange],
    );

    return <InputText {...mergedProps} />;
};

export default NumberInput;
