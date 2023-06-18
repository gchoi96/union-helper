import {
    DEFAULT_AREA_HEIGHT,
    DEFAULT_AREA_WIDTH,
    EXTERNAL_AREA_MAP,
    EXTERNAL_AREA_MAP2,
    MAX_ITERATION_COUNT,
    UNION_BOARD_HEIGHT,
    UNION_BOARD_WIDTH,
} from "@core/constants";
import { CELL_STATUS, EXTERNAL_AREA } from "@core/enums";
import { UnionGrade } from "@core/types/UnionGrade";
import { calcUnionGrade, removeDuplicates } from "@core/utils";
import { Block } from "@core/classes/Block";
import BlockList from "@core/classes/BlockList";
import ClusteredBlockTable from "@core/classes/ClusteredBlockTable";
import Position from "@core/classes/Position";
import UnionBoard from "@core/classes/UnionBoard";
import WIS from "@core/classes/WIS";

export default class UnionManager {
    readonly occupiableSize: number;
    readonly blockList: BlockList;
    readonly usableBlockCount;
    readonly grade: UnionGrade;

    private plannedOccupiableArea: number;
    private board: UnionBoard = new UnionBoard();

    private _priority: EXTERNAL_AREA[] = [];
    public get priority(): EXTERNAL_AREA[] {
        return [...this._priority];
    }

    constructor(blocks: Block[] | BlockList) {
        this.blockList = blocks instanceof BlockList ? blocks : new BlockList(blocks);
        this.grade = calcUnionGrade(this.blockList.getTotalLevel());
        this.usableBlockCount = this.grade.blockCount ?? 9;
        this.occupiableSize = this.calcAvailableSize(this.grade.blockCount);
        this.plannedOccupiableArea = this.occupiableSize;
        this.initAreaStatus(this.grade.occupiableLevel);
    }

    initAreaStatus(occupiableLevel: number) {
        for (let y = 0; y < UNION_BOARD_HEIGHT; y++) {
            for (let x = 0; x < UNION_BOARD_WIDTH; x++) {
                const { dy, dx } = this.board.calcDistanceFromCenter(new Position(y, x));
                if (dy + 1 > DEFAULT_AREA_HEIGHT + occupiableLevel) return;
                if (dx + 1 > DEFAULT_AREA_WIDTH + occupiableLevel) return;
                this.board.setStatus(new Position(y, x), CELL_STATUS.AVAILABLE);
            }
        }
    }

    display() {
        console.log(this.board.toString());
    }

    setPriority(areas: EXTERNAL_AREA[]) {
        this._priority = areas;
        const positions = this.getToBeOccupiedPositions(this.priority, this.occupiableSize);
        this.plannedOccupiableArea = positions.length;
        this.board.reset();
        for (let i = 0; i < positions.length; i++) {
            this.board.setStatus(positions[i], CELL_STATUS.TO_BE_OCCUPIED);
        }
    }

    simulate() {
        const controlPositions = UnionBoard.controlArea.filter((p) => this.board.getCellFromPosition(p).isToBeOccupied);
        const blockTable = new ClusteredBlockTable(this.blockList.getBlocks(this.grade.blockCount));
        const wises = this.placeFirstBlock(controlPositions, blockTable);
        console.log(this.getPlacementResult(wises)?.toString());
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

    private calcAvailableSize(blockCount: number) {
        return this.blockList.blocks.slice(0, blockCount).reduce((acc, cur) => acc + cur.size, 0);
    }

    private getToBeOccupiedPositions(areas: EXTERNAL_AREA[], maxCount: number): Position[] {
        const result: Position[][] = [];
        const inner = (selectedPositions: Position[], level: number) => {
            if (level === areas.length) {
                result.push(selectedPositions);
                return;
            }
            const area = areas[level];
            const areaInfo = UnionBoard.externalArea[area];
            const startPosition = this.board.calcStartPosition(area, selectedPositions);
            const positions = this.getPositionsToOccupyByArea(startPosition, area);
            if (selectedPositions.length + positions.length > maxCount) {
                result.push(selectedPositions);
                return;
            }
            if (startPosition !== areaInfo.startPosition) {
                inner(removeDuplicates([...selectedPositions, ...positions]), level + 1);
                return;
            }
            const controlPos = this.board.getNearestControlPosition(area, selectedPositions);
            const startPos = EXTERNAL_AREA_MAP[area].startPosition;
            Position.getConnectionPath(controlPos, startPos).forEach((path) =>
                inner(removeDuplicates([...selectedPositions, ...path, ...positions]), level + 1)
            );
        };
        inner([], 0);
        return Array.from(result.reduce((acc, cur) => (acc.length > cur.length ? cur : acc)));
    }

    private getPositionsToOccupyByArea(startPosition: Position, area: EXTERNAL_AREA) {
        const positions: Position[] = [];
        const history = new Set<Position>();
        const inner = (position: Position) => {
            for (const delta of UnionBoard.searchDirection) {
                const nextPosition = position.move(delta);
                if (history.has(nextPosition)) continue;
                history.add(nextPosition);
                if (!UnionBoard.isValidPosition(nextPosition)) continue;
                if (!EXTERNAL_AREA_MAP2[area].includes(nextPosition)) continue;
                positions.push(nextPosition);
                inner(nextPosition);
            }
        };
        inner(startPosition);
        return positions;
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
                            remainSize: this.plannedOccupiableArea - block.size,
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

    // private isBlockPlacementPossible(board: UnionBoard, position: Position, blockTable: ClusteredBlockTable) {
    //     const blocks = blockTable.table.map((row) => row[row.length - 1]);
    //     for (const block of blocks) {
    //         for (const shape of block.shapes) {
    //             const transformations = shape.deltas.map((_, dIdx) => shape.getDeltasByIndex(dIdx));
    //             for (const deltas of transformations) {
    //                 const targetPositions = deltas.map((delta) => position.move(delta));
    //                 if (!UnionBoard.isValidArea(targetPositions)) continue;
    //                 if (!board.isOccupiableArea(targetPositions)) continue;
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
}
