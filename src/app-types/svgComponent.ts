import type { FunctionComponent, SVGProps } from "react";

export type TSvgComponent = FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
>;
