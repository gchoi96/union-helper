import { CELL_STATUS } from "#enums/status";
import ClusteredBlockTable from "#classes/ClusteredBlockTable";
import Position from "#classes/Position";
import UnionBoard from "#classes/UnionBoard";
import { removeDuplicates } from "#utils";

interface WISInput {
    board: UnionBoard;
    blockTable: ClusteredBlockTable;
}
export default class WIS {
    board: UnionBoard;
    blockTable: ClusteredBlockTable;
    targetPositions: Position[] = [];
    positionIdx = 0;
    private history: {
        key: string;
        shapeIdx: number;
        deltaIdx: number;
        positions: Position[];
        targetPositions: Position[];
    }[] = [];


    constructor(wis: WISInput) {
        this.board = wis.board;
        this.blockTable = wis.blockTable;
        // this.board.board.forEach((row, rIdx) =>
        //     row.forEach(
        //         (cell, cIdx) =>
        //             cell.status === CELL_STATUS.TO_BE_OCCUPIED && this.targetPositions.push(new Position(rIdx, cIdx))
        //     )
        // );
    }

    place(key: string, positions: Position[], deltaIdx: number, shapeIdx: number) {
        const block = this.blockTable.shift(key);
        this.history.push({
            key,
            positions: positions,
            targetPositions: [...this.targetPositions],
            deltaIdx,
            shapeIdx,
        });
        this.board.place(block, positions);
        const newTargetPositions = removeDuplicates(
            positions.map((position) => this.board.getAdjacentPositions(position)).flat()
        );
        this.targetPositions = removeDuplicates([
            ...this.targetPositions.slice(0, this.targetPositions.length - 1),
            ...newTargetPositions,
        ]).filter((position) => this.board.getCellFromPosition(position).status === CELL_STATUS.TO_BE_OCCUPIED);
        this.blockTable.table[key].deltaIdx = 0;
        this.blockTable.shapeIdx = 0;
    }

    placeFirstBLock(key: string, positions: Position[]) {
        const block = this.blockTable.shift(key);
        this.board.place(block, positions);
        this.targetPositions = removeDuplicates(
            positions.map((position) => this.board.getAdjacentPositions(position)).flat()
        ).filter((position) => this.board.getCellFromPosition(position).isToBeOccupied)
        this.blockTable.table[key].blocks = this.blockTable.table[key].blocks.filter((_block) => _block !== block);
        this.blockTable.shapeIdx = 0;
    }

    revert() {
        if (!this.history.length) return;
        const { key, deltaIdx, positions, shapeIdx, targetPositions } = this.history.pop()!;
        this.board.removeBlock(positions);
        this.blockTable.shapeIdx = shapeIdx;
        this.targetPositions = targetPositions;
        this.blockTable.table[key].blockIdx--;
        this.blockTable.table[key].deltaIdx = deltaIdx + 1;
    }

    isPlacementPossible(positions: Position[]) {
        if (!UnionBoard.isValidArea(positions)) return false;
        if (!this.board.isOccupiableArea(positions)) return false;
        return true;
    }
}
