import InputWithIcon from "@components/InputWithIcon";
import CrossIcon from "@assets/icons/cross.svg?react";
import { InputText, InputTextProps } from "primereact/inputtext";
import { TSvgComponent } from "@app-types/svgComponent";
import { ReactElement, ChangeEvent } from "react";
import "./style.css";

export interface IInputWithToolsProps extends Omit<
    InputTextProps,
    "type" | "onChange"
> {
    Icon?: TSvgComponent;
    onChange: (newQuery: string) => void;
}

const InputWithTools = ({
    Icon,
    onChange,
    ...otherProps
}: IInputWithToolsProps): ReactElement => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.stopPropagation();

        onChange(event.target.value);
    };

    const onClear = (): void => {
        onChange("");
    };

    return (
        <div className="input-with-tools">
            {Icon && (
                <InputWithIcon
                    withRightTool
                    Icon={Icon}
                    {...otherProps}
                    onChange={handleChange}
                />
            )}
            {!Icon && (
                <InputText
                    style={{ paddingRight: "2.75rem" }}
                    {...otherProps}
                />
            )}
            <CrossIcon onClick={onClear} className="clear-icon action-icon" />
        </div>
    );
};

export default InputWithTools;
