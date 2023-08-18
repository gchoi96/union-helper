import { CELL_STATUS } from "#enums/status";
import { Block } from "#classes/Block";
import { EXTERNAL_AREA } from "#enums/externalArea";
import { CSSProperties } from "react";
import Position from "#classes/Position";

export default class Cell {
    public status: CELL_STATUS;
    occupyingBlock: Block | null = null;
    private _ability: EXTERNAL_AREA | undefined;
    public group:Position[] = []
    public css: CSSProperties | undefined;

    get ability() {
        return this._ability;
    }
    get isToBeOccupied() {
        return this.status === CELL_STATUS.TO_BE_OCCUPIED;
    }
    constructor(ability?: EXTERNAL_AREA, status = CELL_STATUS.AVAILABLE, occupyingBlock: null | Block = null) {
        this.status = status;
        this.occupyingBlock = occupyingBlock;
        this._ability = ability;
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
        return new Cell(this._ability, this.status, this.occupyingBlock);
    }
}
