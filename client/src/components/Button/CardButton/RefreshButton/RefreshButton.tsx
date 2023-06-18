import { BUTTON_COLOR } from "@/styles/color";
import CardButton from "../CardButton";

export default function CardButtonRefresh({ onClick }: { onClick: () => void }) {
    return <CardButton color={BUTTON_COLOR.PRIMARY} image={"/refresh_icon.svg"} onClick={onClick} />;
}