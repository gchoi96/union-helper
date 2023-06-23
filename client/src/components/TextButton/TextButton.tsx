import { BUTTON_COLOR } from "@/core/enums";
import { Button } from "./TextButton.styles";

export interface TextButtonProps {
    size?: "small" | "large";
    background?: BUTTON_COLOR;
    children: string | JSX.Element | JSX.Element[];
    onClick: () => void;
}
export default function TextButton({
    background = BUTTON_COLOR.BLUE,
    size = "small",
    children,
    onClick,
}: TextButtonProps) {
    return (
        <Button background={background} size={size} onClick={onClick}>
            {children}
        </Button>
    );
}
