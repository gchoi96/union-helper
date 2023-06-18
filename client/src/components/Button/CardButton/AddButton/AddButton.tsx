import { BUTTON_COLOR } from "@/styles/color";
import CardButton from "../CardButton";

export default function CardButtonAdd({ onClick }: { onClick: () => void }) {
    return <CardButton color={BUTTON_COLOR.PRIMARY} image={"/plus_icon.svg"} onClick={onClick} />;
}
