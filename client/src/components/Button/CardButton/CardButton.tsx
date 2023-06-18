import { Button } from "./CardButton.styles";
interface CardButtonProps {
    color: string;
    onClick: () => void;
    image: string;
}
export default function CardButton(props: CardButtonProps) {
    return (
        <Button color={props.color} onClick={props.onClick}>
            <img src={props.image} />
        </Button>
    );
}