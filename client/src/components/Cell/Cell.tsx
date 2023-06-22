import { CELL_STATUS } from "@/core/enums";
import { CheckBox } from "./Cell.styles";

interface CellProps {
    status: CELL_STATUS;
    handleClick: () => void;
    size: number | string;
}

export default function Cell(props: CellProps) {
    return <CheckBox size={props.size} status={props.status ?? CELL_STATUS.UNAVAILABLE} onClick={props.handleClick} />;
}