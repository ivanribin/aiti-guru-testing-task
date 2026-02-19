import buttonDesignSystem from "./button";
import checkboxDesignSystem from "./checkbox";
import passwordDesignSystem from "./password";
import inputTextDesignSystem from "./inputtext";
import progressSpinnerDesignSystem from "./progress-spinner";
import { type PrimeReactPTOptions } from "primereact/api";

const DesignSystem: PrimeReactPTOptions = {
    inputtext: inputTextDesignSystem,
    password: passwordDesignSystem,
    checkbox: checkboxDesignSystem,
    button: buttonDesignSystem,
    progressspinner: progressSpinnerDesignSystem,
};

export default DesignSystem;
