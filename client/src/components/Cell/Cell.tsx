import { CELL_STATUS } from "@/core/enums";
import { CheckBox } from "./Cell.styles";

interface CellProps {
    status: CELL_STATUS;
    handleClick: () => void;
}

export default function Cell(props: CellProps) {
    return (
        <CheckBox
            status={props.status ?? CELL_STATUS.UNAVAILABLE}
            onClick={props.handleClick}
        />
    );
}
