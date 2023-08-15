import BlockList from "#classes/BlockList";
import UnionBoard from "#classes/UnionBoard";
import { Block } from "#classes/Block";
import Position from "#classes/Position";
import { MAX_ITERATION_COUNT } from "#constants/numbers";
import { CELL_STATUS } from "#enums/status";
import ClusteredBlockTable from "#classes/ClusteredBlockTable";
import WIS from "./WIS";

export default class UnionManager {
    readonly blockList: BlockList;
    readonly usableBlockCount;

    private board: UnionBoard;

    constructor(blocks: Block[] | BlockList, board: UnionBoard) {
        this.blockList = blocks instanceof BlockList ? blocks : new BlockList(blocks);
        this.usableBlockCount = this.blockList.blocks.length;
        this.board = board;
    }

    simulate() {
        const controlPositions = UnionBoard.controlArea.filter((p) => this.board.getCellFromPosition(p).isToBeOccupied);
        const blockTable = new ClusteredBlockTable(this.blockList.blocks);
        const wises = this.placeFirstBlock(controlPositions, blockTable);
    }

    private getPlacementResult(wises: WIS[]){
        let result: UnionBoard | undefined = undefined;
        let iterationCount = 0;
        const inner = (wis: WIS) => {
            if(++iterationCount > MAX_ITERATION_COUNT) return;;
            if (!wis.isRemainingPositions) return;
            if (result) return;
            const position = wis.nextPosition;
            for (let bIdx = 0; bIdx < wis.blockTypeCount; bIdx++) {
                const block = wis.getBlock(bIdx);
                for (const shape of block.shapes) {
                    const transformations = shape.deltas.map((_, dIdx) => shape.getDeltasByIndex(dIdx));
                    for (const deltas of transformations) {
                        const targetPositions = deltas.map((delta) => position.move(delta));
                        if (!wis.isPlacementPossible(targetPositions)) continue;
                        const next = wis.next(bIdx, block, targetPositions);
                        if (next.isPlacementCompleted) result = wis.board;
                        inner(next);
                        if (!result) wis.board.removeBlock(targetPositions);
                    }
                }
            }
        };
        wises.forEach((wis) => inner(wis));
        return result ? result as UnionBoard : undefined;
    }

    private placeFirstBlock(controlPositions: Position[], blockTable: ClusteredBlockTable): WIS[] {
        return controlPositions
            .map((controlPos) => {
                return blockTable.table.map((blocks, idx) => {
                    const block = blocks.at(-1);
                    if (!block) return [];
                    return block.shapes.map((shape) => {
                        const targetPositions = shape.deltas.map((delta) => controlPos.move(delta));
                        if (!UnionBoard.isValidArea(targetPositions)) return;
                        if (!this.board.isPlacementPossible(targetPositions)) return;
                        const board = this.board.copy();
                        const _blockTable = blockTable.copy();
                        targetPositions.forEach((pos) => board.setStatus(pos, CELL_STATUS.OCCUPIED, block));
                        _blockTable.table[idx].pop();
                        const linkedPositions = targetPositions
                            .map((pos) => board.getAdjacentPositions(pos))
                            .flat()
                            .filter((pos) => board.getCellFromPosition(pos).isToBeOccupied);
                        return new WIS({
                            board,
                            blockTable: _blockTable,
                            linkedPositions,
                        });
                    });
                });
            })
            .flat(2)
            .reduce<WIS[]>((acc, cur) => {
                cur && acc.push(cur);
                return acc;
            }, []);
    }
}
