import { CELL_STATUS } from "#enums/status";
import { Block } from "#classes/Block";
import { EXTERNAL_AREA } from "#enums/externalArea";
import { CSSProperties } from "react";
import Position from "#classes/Position";
import { AREA_BORDER_MAP } from "#constants/maps";

export default class Cell {
    public status: CELL_STATUS;
    occupyingBlock: Block | null = null;
    public ability: EXTERNAL_AREA | undefined;
    public group: Position[] = [];
    public css: CSSProperties | undefined;
    public position: Position;

    get isSelected() {
        return this.status === CELL_STATUS.SELECTED;
    }

    constructor(
        position: Position,
        ability?: EXTERNAL_AREA,
        status = CELL_STATUS.NOT_SELECTED,
        occupyingBlock: null | Block = null
    ) {
        this.status = status;
        this.occupyingBlock = occupyingBlock;
        this.ability = ability;
        this.position = position;
        this.css = this.initBorder();
    }

    private initBorder() {
        const borders = AREA_BORDER_MAP.get(this.position);
        if (!borders) return {};
        return borders.reduce((css, dir) => {
            css[`border${dir}`] = `0.2px solid white`;
            return css;
        }, {} as { [key: string]: string });
    }

    changeStatus(status: CELL_STATUS) {
        this.status = status;
    }

    place(block: Block) {
        this.status = CELL_STATUS.PLACED;
        if (this.occupyingBlock) throw new Error("??");
        this.occupyingBlock = block;
    }

    copy() {
        return new Cell(this.position, this.ability, this.status, this.occupyingBlock);
    }
}
