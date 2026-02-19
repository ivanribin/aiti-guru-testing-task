import buttonDesignSystem from "./button";
import checkboxDesignSystem from "./checkbox";
import passwordDesignSystem from "./password";
import inputTextDesignSystem from "./inputtext";
import { type PrimeReactPTOptions } from "primereact/api";

const DesignSystem: PrimeReactPTOptions = {
    inputtext: inputTextDesignSystem,
    password: passwordDesignSystem,
    checkbox: checkboxDesignSystem,
    button: buttonDesignSystem,
};

export default DesignSystem;
