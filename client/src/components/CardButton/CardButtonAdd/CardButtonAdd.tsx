import { BUTTON_COLOR } from "@/styles/color";
import CardButton from "../CardButton";

export default function CardButtonAdd({ onClick, size = "2rem" }: { onClick: () => void; size?: string }) {
    return <CardButton color={BUTTON_COLOR.PRIMARY} image={"/plus_icon.svg"} onClick={onClick} size={size} />;
}