import { CELL_STATUS } from "@core/enums";
import { Block } from "../classes/Block";

export interface Cell {
    status: CELL_STATUS;
    occupyingBlock: null | Block;
}
