import { CELL_STATUS } from "#enums/status";
import ClusteredBlockTable from "#classes/ClusteredBlockTable";
import Position from "#classes/Position";
import UnionBoard from "#classes/UnionBoard";

interface WISInput {
    board: UnionBoard;
    blockTable: ClusteredBlockTable;
}
export default class WIS {
    board: UnionBoard;
    blockTable: ClusteredBlockTable;
    targetPositions: Position[] = [];
    positionIdx = 0;
    private history: { key: string; positionIdx: number; shapeIdx: number; deltaIdx: number; positions: Position[] }[] = [];

    get isPlacementEnd() {
        return this.history.length === this.blockTable.length;
    }

    constructor(wis: WISInput) {
        this.board = wis.board;
        this.blockTable = wis.blockTable;
        this.board.board.forEach((row, rIdx) =>
            row.forEach(
                (cell, cIdx) =>
                    cell.status === CELL_STATUS.TO_BE_OCCUPIED && this.targetPositions.push(new Position(rIdx, cIdx))
            )
        );
    }

    placeFirstBLock(key: string, positions: Position[]) {
        const block = this.blockTable.shift(key);
        this.board.place(block, positions);
        this.blockTable.table[key].blocks = this.blockTable.table[key].blocks.filter((_block) => _block !== block)
        this.blockTable.table[key].blockIdx = 0;
        this.blockTable.length = this.blockTable.table[key].blocks.length;
        this.blockTable.shapeIdx = 0;
    }

    isPlacementPossible(positions: Position[]) {
        if (!UnionBoard.isValidArea(positions)) return false;
        if (!this.board.isOccupiableArea(positions)) return false;
        return true;
    }

    revert(){}
    place(){}
}
