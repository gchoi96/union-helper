import UnionBoard from "#classes/UnionBoard";
import { Block } from "#classes/Block";
import Position from "#classes/Position";
import ClusteredBlockTable from "#classes/ClusteredBlockTable";
import WIS from "#classes/WIS";
import { MAX_ITERATION_COUNT } from "#constants/numbers";

export default class UnionManager {
    private blockTable: ClusteredBlockTable;
    private board: UnionBoard;

    constructor(blocks: Block[], board: UnionBoard) {
        this.blockTable = new ClusteredBlockTable(blocks);
        this.board = board;
    }

    simulate() {
        const controlPositions = UnionBoard.controlArea.filter((p) => this.board.getCellFromPosition(p).isToBeOccupied);
        const wises = this.placeFirstBlock(controlPositions, this.blockTable);
        const result = this.getPlacementResult(wises);
        return result
    }

    private getPlacementResult(wises: WIS[]) {
        let result: UnionBoard | undefined = undefined;
        const inner = (wis: WIS) => {
            let iterationCount = 0;
            while (++iterationCount < MAX_ITERATION_COUNT) {
                const success = wis.next();
                if(!success) continue;
                result = wis.board;
                break;
            };
        }
        wises.forEach(inner);
        console.log(result ? (result as UnionBoard).toString() : "");
        return result;
    }

    private placeFirstBlock(controlPositions: Position[], blockTable: ClusteredBlockTable): any[] /*WIS[]*/ {
        return controlPositions
            .map((controlPosition) => {
                return blockTable.getAllTransformations().map(({transformations }, shapeIdx) => {
                    return transformations.map((shape) => {
                        const targetPositions = shape.deltas.map((delta) => controlPosition.move(delta));
                        if (!UnionBoard.isValidArea(targetPositions)) return undefined;
                        if (!this.board.isPlacementPossible(targetPositions)) return undefined;
                        const copiedBlockTable = blockTable.copy();
                        const copiedBoard = this.board.copy();
                        const wis = new WIS({ board: copiedBoard, blockTable: copiedBlockTable });
                        wis.placeFirstBLock(shapeIdx, targetPositions);
                        return new WIS({ board: copiedBoard, blockTable: copiedBlockTable });
                    });
                });
            })
            .flat(2)
            .filter((wis) => wis);
    }
}
