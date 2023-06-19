import { Button } from "./CardButton.styles";
interface CardButtonProps {
    color: string;
    onClick: () => void;
    image: string;
    size?: string;
}
export default function CardButton(props: CardButtonProps) {
    return (
        <Button color={props.color} onClick={props.onClick} size={props.size ?? "2rem"}>
            <img src={props.image} />
        </Button>
    );
}
