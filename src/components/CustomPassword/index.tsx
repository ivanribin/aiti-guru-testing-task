import InputWithIcon from "@components/InputWithIcon";
import HidePasswordIcon from "@assets/icons/hide-password.svg?react";
import VisiblePasswordIcon from "@assets/icons/visible-password.svg?react";
import { InputHTMLAttributes, ReactElement, useState } from "react";
import { InputText, InputTextProps } from "primereact/inputtext";
import { TSvgComponent } from "@app-types/svgComponent";
import "./style.css";

export interface ICustomPasswordProps extends Omit<InputTextProps, "type"> {
    Icon?: TSvgComponent;
}

const CustomPassword = ({
    Icon,
    ...otherProps
}: ICustomPasswordProps): ReactElement => {
    const [isHide, setIsHide] = useState<boolean>(true);

    const onToggleHide = (): void => {
        setIsHide((previousValue: boolean) => !previousValue);
    };

    const CurrentToggleIcon: TSvgComponent = !isHide
        ? HidePasswordIcon
        : VisiblePasswordIcon;
    const currentType: InputHTMLAttributes<HTMLInputElement>["type"] = !isHide
        ? "text"
        : "password";

    return (
        <div className="custom-password">
            {Icon && (
                <InputWithIcon
                    withRightTool
                    Icon={Icon}
                    type={currentType}
                    {...otherProps}
                />
            )}
            {!Icon && (
                <InputText
                    style={{ paddingRight: "2.75rem" }}
                    type={currentType}
                    {...otherProps}
                />
            )}
            <CurrentToggleIcon
                onClick={onToggleHide}
                className="toggle-icon action-icon"
            />
        </div>
    );
};

export default CustomPassword;
