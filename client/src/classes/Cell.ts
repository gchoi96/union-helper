import { CELL_STATUS } from "#enums/status";
import { Block } from "#classes/Block";

export default class Cell {
    public status: CELL_STATUS;
    occupyingBlock: Block | null = null;
    get isToBeOccupied() {
        return this.status === CELL_STATUS.TO_BE_OCCUPIED;
    }
    constructor(status = CELL_STATUS.AVAILABLE, occupyingBlock: null | Block = null) {
        this.status = status;
        this.occupyingBlock = occupyingBlock;
    }

    changeStatus(status: CELL_STATUS) {
        this.status = status;
    }

    occupy(block: Block) {
        this.status = CELL_STATUS.OCCUPIED;
        if (this.occupyingBlock) throw new Error("??");
        this.occupyingBlock = block;
    }

    copy() {
        return new Cell(this.status, this.occupyingBlock);
    }
}
