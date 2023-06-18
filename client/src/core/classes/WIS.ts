import { CELL_STATUS } from "@core/enums";
import { removeDuplicates } from "@core/utils";
import { Block } from "@core/classes/Block";
import ClusteredBlockTable from "@core/classes/ClusteredBlockTable";
import Position from "@core/classes/Position";
import UnionBoard from "@core/classes/UnionBoard";
interface WISInput {
    board: UnionBoard;
    blockTable: ClusteredBlockTable;
    linkedPositions: Position[];
    remainSize: number;
}
export default class WIS {
    private _board: UnionBoard;
    private blockTable: ClusteredBlockTable;
    private linkedPositions: Position[];
    private remainSize: number;
    get board() {
        return this._board;
    }

    get isPlacementCompleted() {
        return this.remainSize < 1;
    }

    get isRemainingPositions() {
        return this.linkedPositions.length;
    }

    get nextPosition() {
        if (!this.linkedPositions.length) throw new Error();
        return this.linkedPositions.at(-1)!;
    }

    get blockTypeCount() {
        return this.blockTable.table.length;
    }

    constructor(wis: WISInput) {
        this._board = wis.board;
        this.blockTable = wis.blockTable;
        this.linkedPositions = wis.linkedPositions;
        this.remainSize = wis.remainSize;
    }

    getBlock(typeIdx: number) {
        return this.blockTable.table[typeIdx][this.blockTable.table[typeIdx].length - 1];
    }

    isPlacementPossible(positions: Position[]) {
        if (!UnionBoard.isValidArea(positions)) return false;
        if (!this.board.isOccupiableArea(positions)) return false;
        return true;
    }

    next(blockTypeIndex: number, block: Block, placedPositions: Position[]){
        
        placedPositions.forEach((pos) => {
            const cell = this.board.getCellFromPosition(pos);
            cell.status = CELL_STATUS.OCCUPIED;
            cell.occupy(block);
        });

        const newLinkedPositions = removeDuplicates(
            this.linkedPositions
                .concat(placedPositions.map((pos) => this.board.getAdjacentPositions(pos)).flat())
                .filter((pos) => this.board.getCellFromPosition(pos).isToBeOccupied)
        );
        const nextWIS = new WIS({
            board: this._board,
            blockTable: this.blockTable.copy().pop(blockTypeIndex),
            linkedPositions: newLinkedPositions,
            remainSize: this.remainSize - block.size,
        })

        return nextWIS;
    }
}