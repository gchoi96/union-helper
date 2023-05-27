import { CELL_STATUS } from "@core/enums";

export interface Cell {
    status: CELL_STATUS;
    // null | any; -> null | Block;
    occupyingBlock: null | any;
}
