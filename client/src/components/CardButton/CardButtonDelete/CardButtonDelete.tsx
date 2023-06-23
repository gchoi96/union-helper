import { CARD_BUTTON_COLOR } from "@/styles/color";
import CardButton from "../CardButton";

export default function CardButtonDelete({ onClick }: { onClick: () => void }) {
    return <CardButton color={CARD_BUTTON_COLOR.DELETE} image={"/delete_icon.svg"} onClick={onClick} />;
}
