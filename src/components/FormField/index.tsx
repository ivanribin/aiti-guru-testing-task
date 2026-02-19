import { CSSProperties, ReactElement, ReactNode } from "react";
import "./style.css";

export enum FormFieldClassnames {
    AUTHORIZATION = "auth",
    TEXTAREA = "textarea",
    DOUBLED = "doubled",
    DOUBLED_COLUMN = "doubled column",
}

interface IFormFieldProps {
    className?: string;
    children: ReactNode;
    label?: string | number;
    styles?: CSSProperties;
}

const FormField = ({
    children,
    label,
    className,
    styles,
}: IFormFieldProps): ReactElement => {
    return (
        <div className={`form-field ${className ?? ""}`} style={styles}>
            {label && (
                <span className="field-header-text description-text">
                    {label}
                </span>
            )}
            <div className="form-field-content">{children}</div>
        </div>
    );
};

export default FormField;
