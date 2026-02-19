/// <reference types="react" />

declare module "*.svg?react" {
    import { TSvgComponent } from "@app-types/svgComponent";

    const ReactComponent: TSvgComponent;

    export default ReactComponent;
}
