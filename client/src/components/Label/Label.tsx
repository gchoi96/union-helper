import { TEXT_COLOR } from "@/styles/color";
import { P } from "./Label.styles";

export interface LabelProps {
    size?: string | number;
    border?: { weight: string | number; color: string };
    fontWeight?: string | number;
    color?: string;
    children: string | JSX.Element | JSX.Element[];
}

export default function Label({
    size = "1.3rem",
    border,
    fontWeight = "400",
    color = TEXT_COLOR.BLACK,
    children,
}: LabelProps) {
    return (
        <P size={size} border={border} fontWeight={fontWeight} color={color}>
            {children}
        </P>
    );
}
