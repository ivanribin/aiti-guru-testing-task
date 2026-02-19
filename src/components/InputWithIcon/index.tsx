import { InputText, InputTextProps } from "primereact/inputtext";
import { TSvgComponent } from "@app-types/svgComponent";
import { ReactElement } from "react";
import "./style.css";

export interface IInputWithIconProps extends InputTextProps {
    Icon: TSvgComponent;
    withRightTool?: boolean;
}

const InputWithIcon = ({
    Icon,
    withRightTool = false,
    ...otherProps
}: IInputWithIconProps): ReactElement => {
    const { className, ...restProps } = otherProps;

    const inputClassname: string = `${className} input-with-icon ${!withRightTool ? "" : "with-right-tool"}`;

    return (
        <div className="input-with-icon-wrapper">
            <Icon className="action-icon input-icon" />
            <InputText {...restProps} className={inputClassname} />
        </div>
    );
};

export default InputWithIcon;
