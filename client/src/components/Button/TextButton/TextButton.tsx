import { Button } from "./TextButton.styles";

interface TextButtonProps {
    children: string;
    size?: string;
    color?: string;
    onClick: () => void;
}
export default function TextButton(props: TextButtonProps) {
    return (
        <Button size={props.size ?? "1.3rem"} color={props.color}>
            {props.children}
        </Button>
    );
}
