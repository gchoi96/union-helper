import ClusteredBlockTable from "#classes/ClusteredBlockTable";
import Position from "#classes/Position";
import UnionBoard from "#classes/UnionBoard";
import { ShapeDetail } from "#types/ShapeDetail";
import { removeDuplicates } from "#utils";

interface WISInput {
    board: UnionBoard;
    blockTable: ClusteredBlockTable;
}
interface WISHistory {
    targetPositions: Position[];
    placedPositions: Position[];
    deltaIdx: number;
    shapeIdx: number;
}
export default class WIS {
    board: UnionBoard;
    private blockTable: ClusteredBlockTable;
    private targetPositions: Position[] = [];
    private basePosition: Position | undefined;
    private history: WISHistory[] = [];

    constructor(wis: WISInput) {
        this.board = wis.board;
        this.blockTable = wis.blockTable;
        // this.board.board.forEach((row, rIdx) =>
        //     row.forEach((cell, cIdx) => cell.isSelected && this.targetPositions.push(new Position(rIdx, cIdx)))
        // );
        this.basePosition = this.getNextBasePosition();
    }

    placeFirstBLock(shapeIdx: number, positions: Position[]) {
        const block = this.blockTable.shift(shapeIdx);
        this.board.place(block, positions);
        this.blockTable.table[shapeIdx].blocks = this.blockTable.table[shapeIdx].blocks.filter(
            (_block) => _block !== block
        );
        removeDuplicates(positions.map((pos) => UnionBoard.getAdjacentPositions(pos)).flat())
            .filter((pos) => this.board.getCellFromPosition(pos).isSelected)
            .forEach((pos) => this.targetPositions.push(pos));
        // this.targetPositions
        this.blockTable.table[shapeIdx].blockIdx = 0;
        this.blockTable.shapeIdx = 0;
    }

    private getNextBasePosition(): Position | undefined {
        return this.targetPositions.find((position) => this.board.getCellFromPosition(position).isSelected);
    }

    next() {
        // if (!this.basePosition) return true;
        if (!this.targetPositions.length) return true;
        const targetPosition = this.targetPositions[this.targetPositions.length - 1];
        for (; this.blockTable.shapeIdx < this.blockTable.shapeCount; this.blockTable.shapeIdx++) {
            const shapeDetail = this.blockTable.table[this.blockTable.shapeIdx];
            if (shapeDetail.blockIdx >= shapeDetail.blocks.length) continue;
            for (; shapeDetail.deltaIdx < shapeDetail.deltas.length; shapeDetail.deltaIdx++) {
                const placedPositions = shapeDetail.deltas[shapeDetail.deltaIdx].map(
                    (delta) => targetPosition?.move(delta)!
                );
                if (!this.board.isPlacementPossible(placedPositions)) continue;
                return this.place(placedPositions, shapeDetail);
            }
            shapeDetail.deltaIdx = 0;
        }
        if (!this.history.length) return false;
        this.revert();
        return false;
    }

    private revert() {
        const prev = this.history.pop();
        if (!prev) return;
        this.board.removeBlock(prev.placedPositions);
        this.blockTable.table[prev.shapeIdx].blockIdx--;
        this.blockTable.table[prev.shapeIdx].deltaIdx = prev.deltaIdx + 1;
        this.blockTable.shapeIdx = prev.shapeIdx;
        this.targetPositions = prev.targetPositions;
        // this.basePosition = prev.basePosition;
    }

    private place(placedPositions: Position[], shapeDetail: ShapeDetail) {
        this.history.push({
            placedPositions,
            shapeIdx: this.blockTable.shapeIdx,
            targetPositions: [...this.targetPositions],
            deltaIdx: shapeDetail.deltaIdx,
        });
        // const targetPosition = this.targetPositions.pop();
        const block = shapeDetail.blocks[shapeDetail.blockIdx];
        shapeDetail.blockIdx++;
        shapeDetail.deltaIdx = 0;
        this.blockTable.shapeIdx = 0;
        this.board.place(block, placedPositions);
        // this.basePosition = this.getNextBasePosition();
        // 블록 배치 후 dead zone이 발생하면 revert
        const adjacentPositions = removeDuplicates(placedPositions.map(UnionBoard.getAdjacentPositions).flat()).filter(
            (pos) => this.board.getCellFromPosition(pos).isSelected
        );
        this.targetPositions = [
            ...this.targetPositions.filter((pos) => this.board.getCellFromPosition(pos).isSelected),
            ...adjacentPositions,
        ];
        const isDeadzone = adjacentPositions.some((pos) =>
            UnionBoard.getAdjacentPositions(pos).every((adjPos) => !this.board.getCellFromPosition(adjPos).isSelected)
        );

        if (isDeadzone) this.revert();
        return this.targetPositions.length ? false : true;
    }
}
