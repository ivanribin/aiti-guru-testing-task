import { type PasswordPassThroughOptions } from "primereact/password";

const passwordDesignSystem: PasswordPassThroughOptions = {
    root: {
        className: "design-system-password-root",
    },
    input: {
        className: "design-system-password-root description-text",
    },
    panel: {
        className: "design-system-hidden",
    },
    meter: {
        className: "design-system-hidden",
    },
    info: {
        className: "design-system-hidden",
    },
};

export default passwordDesignSystem;
