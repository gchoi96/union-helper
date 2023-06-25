import { TEXT_COLOR } from "@/styles/color";
import Label from "../Label/Label";
import { Container } from "./Box.styles";

interface BoxProps {
    title: string;
    width: string;
    height: string;
    children: string | JSX.Element | JSX.Element[];
}
export default function Box({ children, title, width, height }: BoxProps) {
    return (
        <Container width={width} height={height}>
            <Label {...{ size: "1.2rem", fontWeight: 600, color: TEXT_COLOR.WHITE }}>{title}</Label>
            {children}
        </Container>
    );
}
