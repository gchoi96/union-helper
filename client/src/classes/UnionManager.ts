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
        console.log(wises);
        console.log(this.getPlacementResult(wises));
    }

    private getPlacementResult(wises: WIS[]) {
        let iterationCount = 0;
        let result: UnionBoard | undefined = undefined;
        const inner = (wis: WIS) => {
            const { blockTable, board } = wis;
            while (++iterationCount < MAX_ITERATION_COUNT && !result) {
                let placeable = false;
                const targetPosition = wis.targetPositions[wis.targetPositions.length - 1];
                placeLoop: for(; blockTable.shapeIdx < blockTable.shapeCount; blockTable.shapeIdx++){
                    const [key, shapeDetail] = Object.entries(blockTable.table)[blockTable.shapeIdx];
                    if(shapeDetail.blockIdx >= shapeDetail.blocks.length) continue;
                    for(;shapeDetail.deltaIdx < shapeDetail.blocks.length; shapeDetail.deltaIdx++){
                        const deltas = shapeDetail.deltas[shapeDetail.deltaIdx];
                        const positions = deltas.map(delta => targetPosition.move(delta));
                        if(!wis.isPlacementPossible(positions)) continue;
                        wis.place(key, positions, shapeDetail.deltaIdx, blockTable.shapeIdx);
                        console.log(wis);
                        console.log(wis.board.toString());
                        if(!wis.targetPositions.length) result = board;
                        placeable = true;
                        break placeLoop;
                    }
                    shapeDetail.deltaIdx = 0;
                }
                if(placeable) continue;
                wis.revert();
                //#region 
                // const placeable = (() => {
                //     // for (; wis.positionIdx < targetPositions.length; wis.positionIdx++) {
                //         const targetPosition = targetPositions[targetPositions.length - 1];
                //         // if (board.getCellFromPosition(targetPosition).status !== CELL_STATUS.TO_BE_OCCUPIED) continue;
                //         for (; blockTable.shapeIdx < blockTable.shapeCount; blockTable.shapeIdx++) {
                //             const [key, shapeDetail] = Object.entries(blockTable.table)[blockTable.shapeIdx];
                //             if(shapeDetail.blockIdx >= shapeDetail.blocks.length) continue;
                //             for (; shapeDetail.deltaIdx < shapeDetail.deltas.length; shapeDetail.deltaIdx++) {
                //                 const deltas = shapeDetail.deltas[shapeDetail.deltaIdx];
                //                 const positions = deltas.map((delta) => targetPosition.move(delta));
                //                 if (!wis.isPlacementPossible(positions)) continue;
                //                 wis.place(key, wis.positionIdx, positions, shapeDetail.deltaIdx, blockTable.shapeIdx);
                //                 console.log(wis);
                //                 console.log(wis.board.toString());
                //                 // if (wis.isPlacementEnd) result = wis.board;
                //                 return true;
                //             }
                //             shapeDetail.deltaIdx = 0;
                //         // }
                //         blockTable.shapeIdx = 0;
                //         return false;
                //     }
                //     // for (; wis.positionIdx < targetPositions.length; wis.positionIdx++) {
                //     //     const targetPosition = targetPositions[wis.positionIdx];
                //     //     if (board.getCellFromPosition(targetPosition).status !== CELL_STATUS.TO_BE_OCCUPIED) continue;
                //     //     for (; blockTable.shapeIdx < blockTable.shapeCount; blockTable.shapeIdx++) {
                //     //         const [key, shapeDetail] = Object.entries(blockTable.table)[blockTable.shapeIdx];
                //     //         if(shapeDetail.blockIdx >= shapeDetail.blocks.length) continue;
                //     //         for (; shapeDetail.deltaIdx < shapeDetail.deltas.length; shapeDetail.deltaIdx++) {
                //     //             const deltas = shapeDetail.deltas[shapeDetail.deltaIdx];
                //     //             const positions = deltas.map((delta) => targetPosition.move(delta));
                //     //             if (!wis.isPlacementPossible(positions)) continue;
                //     //             wis.place(key, wis.positionIdx, positions, shapeDetail.deltaIdx, blockTable.shapeIdx);
                //     //             console.log(wis);
                //     //             console.log(wis.board.toString());
                //     //             if (wis.isPlacementEnd) result = wis.board;
                //     //             return true;
                //     //         }
                //     //         shapeDetail.deltaIdx = 0;
                //     //     }
                //     //     blockTable.shapeIdx = 0;
                //     //     return false;
                //     // }
                    
                //     //#region
                //     // for (const targetPosition of targetPositions) {
                //         //     if (board.getCellFromPosition(targetPosition).status !== CELL_STATUS.TO_BE_OCCUPIED) continue;
                //         //     const map =  Object.entries(blockTable.table);
                //     //     for(;blockTable.shapeIdx < blockTable.shapeCount; blockTable.shapeIdx++){
                //     //         const [key ,shapeDetail] = map[blockTable.shapeIdx];
                //     //         for (; shapeDetail.deltaIdx < shapeDetail.transformations.length; shapeDetail.deltaIdx++) {
                //     //             const { deltas } = shapeDetail.transformations[shapeDetail.deltaIdx];
                //     //             const positions = deltas.map((delta) => targetPosition.move(delta));
                //     //             if (!wis.isPlacementPossible(positions)) continue;
                //     //             wis.place(key, positions, shapeDetail.deltaIdx, 0);
                //     //             console.log(wis.board.toString());
                //     //             wis.isPlacementEnd && (result = wis.board);
                //     //             return true;
                //     //         }
                //     //         shapeDetail.deltaIdx = 0;
                //     // }
                //     // for (const [key, shapeDetail] of Object.entries(blockTable.table)) {
                //     //     for (; shapeDetail.deltaIdx < shapeDetail.transformations.length; shapeDetail.deltaIdx++) {
                //     //         const { deltas } = shapeDetail.transformations[shapeDetail.deltaIdx];
                //     //         const positions = deltas.map((delta) => targetPosition.move(delta));
                //     //         if (!wis.isPlacementPossible(positions)) continue;
                //     //         wis.place(key, positions, shapeDetail.deltaIdx, 0);
                //     //         console.log(wis.board.toString());
                //     //         wis.isPlacementEnd && (result = wis.board);
                //     //         return true;
                //     //     }
                //     //     shapeDetail.deltaIdx = 0;
                //     // }
                //     //         blockTable.shapeIdx = 0;
                //     //     }
                //     //     return false;
                //     //#endregion
                // })();
                // if (!placeable) {
                //     wis.revert();
                // }
                //#endregion
            }
        };

        inner(wises[0])
        // wises.forEach(inner);
        return result;
    }

    private placeFirstBlock(controlPositions: Position[], blockTable: ClusteredBlockTable): any[] /*WIS[]*/ {
        return controlPositions
            .map((controlPosition) => {
                return blockTable.getAllTransformations().map(({ key, transformations }) => {
                    return transformations.map((shape) => {
                        const targetPositions = shape.deltas.map((delta) => controlPosition.move(delta));
                        if (!UnionBoard.isValidArea(targetPositions)) return undefined;
                        if (!this.board.isPlacementPossible(targetPositions)) return undefined;
                        const copiedBlockTable = blockTable.copy();
                        const copiedBoard = this.board.copy();
                        const wis =  new WIS({ board: copiedBoard, blockTable: copiedBlockTable });
                        wis.placeFirstBLock(key, targetPositions);
                        return wis;
                    });
                });
            })
            .flat(2)
            .filter((wis) => wis);
    }
}
