import UnionBoard from "#classes/UnionBoard";
import { Block } from "#classes/Block";
import Position from "#classes/Position";
import { CELL_STATUS } from "#enums/status";
import ClusteredBlockTable from "#classes/ClusteredBlockTable";
import WIS from "#classes/WIS";
import { MAX_ITERATION_COUNT } from "#constants/numbers";
import { removeDuplicates } from "#utils";

export default class UnionManager {
    readonly usableBlockCount;
    private blockTable: ClusteredBlockTable;
    private board: UnionBoard;

    constructor(blocks: Block[], board: UnionBoard) {
        this.blockTable = new ClusteredBlockTable(blocks);
        this.usableBlockCount = this.blockTable.length;
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
            const history: {
                key: string;
                targetPosition: Position;
                placedPositions: Position[];
                deltaIdx: number;
                shapeIdx: number;
            }[] = [];
            let targetPosition = wis.targetPositions.find(
                (position) => wis.board.getCellFromPosition(position).isToBeOccupied
            );
            while (++iterationCount < MAX_ITERATION_COUNT) {
                let placeable = false;
                // 더 이상 점령해야 할 지역이 없으면 배치 종료
                if (targetPosition === undefined) {
                    result = wis.board;
                    break;
                }
                // 점령 할 지역이 있는 경우
                // 해당 지역에 배치가 가능한 블럭을 찾는다.
                placeLoop: for (; wis.blockTable.shapeIdx < wis.blockTable.shapeCount; wis.blockTable.shapeIdx++) {
                    const [key, shapeDetail] = Object.entries(wis.blockTable.table)[wis.blockTable.shapeIdx];
                    if (shapeDetail.blockIdx >= shapeDetail.blocks.length) continue;
                    for (; shapeDetail.deltaIdx < shapeDetail.deltas.length; shapeDetail.deltaIdx++) {
                        // 블록의 각 변형을 targetPosition에 배치해 본다
                        const placedPositions = shapeDetail.deltas[shapeDetail.deltaIdx].map((delta) =>
                            targetPosition!.move(delta)
                        );
                        // 배치가 불가능한 경우 (선택되지 않은 지역 포함 / board의 범위를 벗어남) 다음 변형으로 다시 시도
                        if (!wis.board.isPlacementPossible(placedPositions)) continue;
                        // 배치가 가능한 경우
                        // 되돌려야 하는 경우를 대비해 이전 상태 기록
                        history.push({
                            key,
                            placedPositions,
                            deltaIdx: shapeDetail.deltaIdx,
                            shapeIdx: wis.blockTable.shapeIdx,
                            targetPosition: targetPosition,
                        });
                        // 배치
                        const block = shapeDetail.blocks[shapeDetail.blockIdx];
                        shapeDetail.blockIdx++;
                        shapeDetail.deltaIdx = 0;
                        wis.blockTable.shapeIdx = 0;
                        wis.board.place(block, placedPositions);
                        wis.blockTable.updateMinBlockSize();
                        // 블럭 배치 후 인접 좌표 중 사용할 수 없는 영역이 생긴 경우
                        removeDuplicates(
                            placedPositions.map((position) => wis.board.getAdjacentPositions(position)).flat()
                        ).filter((position) => wis.board.getCellFromPosition(position).isToBeOccupied).some((position) => {
                            const areaSize = UnionBoard.searchDirection.reduce((count, delta) => {
                                const movedPosition = position.move(delta);
                                if(!UnionBoard.isValidPosition(movedPosition)) return count;
                                if(wis.board.getCellFromPosition(movedPosition)?.isToBeOccupied) return count + 1;
                                return count;
                            }, 0);
                            return areaSize < wis.blockTable.minBlockSize;
                        });

                        placeable = true;
                        break placeLoop;
                    }
                    // 마지막 변형까지 반복했지만 배치하지 못한 경우 다음 탐색을 위해 deltaIdx를 초기화
                    shapeDetail.deltaIdx = 0;
                }
                // 배치 후 루프를 빠져나온 경우 다음 지역 선택 후 반복
                if (placeable) {
                    targetPosition = wis.targetPositions.find(
                        (position) => wis.board.getCellFromPosition(position).isToBeOccupied
                    );
                    continue;
                }
                // 배치 실패 후 루프를 빠져나온 경우 이전 상태로 되돌리기
                if (!history.length) throw new Error();
                const prev = history.pop()!;
                wis.board.removeBlock(prev.placedPositions);
                wis.blockTable.table[prev.key].blockIdx--;
                wis.blockTable.table[prev.key].deltaIdx = prev.deltaIdx + 1;
                wis.blockTable.shapeIdx = prev.shapeIdx;
                targetPosition = prev.targetPosition;
                wis.blockTable.updateMinBlockSize();
                wis.revert();
            }
        };
        // inner(wises[0]);
        wises.forEach(inner);
        console.log(result ? (result as UnionBoard).toString() : "");
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
                        const wis = new WIS({ board: copiedBoard, blockTable: copiedBlockTable });
                        wis.placeFirstBLock(key, targetPositions);
                        return new WIS({ board: copiedBoard, blockTable: copiedBlockTable });
                    });
                });
            })
            .flat(2)
            .filter((wis) => wis);
    }
}
