import LogoIcon from "@assets/icons/logo.svg?react";
import { ReactElement } from "react";

interface ILogoProps {
    width?: string;
    height?: string;
}

const DEFAULT_WIDTH: string = "7.6875rem";
const DEFAULT_HEIGHT: string = "2.0625rem";

const Logo = ({
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
}: ILogoProps): ReactElement => {
    return <LogoIcon width={width} height={height} />;
};

export default Logo;
