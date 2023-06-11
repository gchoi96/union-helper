import { Console } from "console";
import {
    DEFAULT_AREA_HEIGHT,
    DEFAULT_AREA_WIDTH,
    EXTERNAL_AREA_MAP,
    EXTERNAL_AREA_MAP2,
    UNION_BOARD_HEIGHT,
    UNION_BOARD_WIDTH,
} from "../constants";
import { CELL_STATUS, EXTERNAL_AREA } from "../enums";
import { PlaceStatus } from "../types/PlaceStatus";
import { UnionGrade } from "../types/UnionGrade";
import { calcUnionGrade, removeDuplicates } from "../utils";
import { Block } from "./Block";
import BlockList from "./BlockList";
import ClusteredBlockTable from "./ClusteredBlockTable";
import Position from "./Position";
import UnionBoard from "./UnionBoard";

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

    getPriority() {
        return [...this.priority];
    }

    simulate() {
        let result: UnionBoard | undefined = undefined;
        const controlPositions = UnionBoard.controlArea.filter((pos) => this.board.getCellFromPosition(pos).status === CELL_STATUS.TO_BE_OCCUPIED);
        const blockTable = new ClusteredBlockTable(this.blockList.getBlocks(this.grade.blockCount));
        const boardsInPlacement = this.placeFirstBlock(controlPositions, blockTable);
        const inner = (status: PlaceStatus) => {
            if (!status.linkedPositions.length) return;
            if (result) return;
            const position = status.linkedPositions[status.linkedPositions.length - 1];
            for (let bIdx = 0; bIdx < status.blockTable.table.length; bIdx++) {
                const blocks = status.blockTable.table[bIdx];
                const block = blocks[blocks.length - 1];
                for (const shape of block.shapes) {
                    const transformations = shape.deltas.map((_, dIdx) => shape.getDeltasByIndex(dIdx));
                    for (const deltas of transformations) {
                        const targetPositions = deltas.map((delta) => position.move(delta));
                        if (!UnionBoard.isValidArea(targetPositions)) continue;
                        if (!status.board.isOccupiableArea(targetPositions)) continue;
                        status.board.occupy(block, targetPositions);
                        const newLinkedPosition = [
                            ...status.linkedPositions,
                            ...targetPositions.reduce<Position[]>(
                                (acc, cur) => [...acc, ...status.board.getAdjacentPositions(cur)],
                                []
                            ),
                        ].filter((pos) => status.board.getCellFromPosition(pos).status === CELL_STATUS.TO_BE_OCCUPIED);
                        if(status.remainSize - block.size < 1){
                            result = status.board;
                            return;
                        }
                        inner({
                            board: status.board,
                            blockTable: status.blockTable.copy().pop(bIdx),
                            linkedPositions: removeDuplicates(newLinkedPosition),
                            remainSize: status.remainSize - block.size,
                        });
                        if(!result)
                        status.board.removeBlock(targetPositions);
                    }
                }
            }
        };
        for (const a of boardsInPlacement) {
            inner(a);
        }
        if (result) console.log((result as UnionBoard).toString());
    }

    private calcAvailableSize(blockCount: number) {
        return this.blockList.blocks.slice(0, blockCount).reduce((acc, cur) => acc + cur.size, 0);
    }

    private getToBeOccupiedPositions(areas: EXTERNAL_AREA[], maxCount: number): Position[] {
        const result: Position[][] = [];
        const dfs = (selectedPositions: Position[], level: number) => {
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
                dfs(removeDuplicates([...selectedPositions, ...positions]), level + 1);
                return;
            }
            const controlPos = this.board.getNearestControlPosition(area, selectedPositions);
            const startPos = EXTERNAL_AREA_MAP[area].startPosition;
            Position.getConnectionPath(controlPos, startPos).forEach((path) =>
                dfs(removeDuplicates([...selectedPositions, ...path, ...positions]), level + 1)
            );
        };
        dfs([], 0);
        return Array.from(result.reduce((acc, cur) => (acc.length > cur.length ? cur : acc)));
    }

    private getPositionsToOccupyByArea(startPosition: Position, area: EXTERNAL_AREA) {
        const positions: Position[] = [];
        const history = new Set<Position>();
        const dfs = (position: Position) => {
            for (const delta of UnionBoard.searchDirection) {
                const nextPosition = position.move(delta);
                if (history.has(nextPosition)) continue;
                history.add(nextPosition);
                if (!UnionBoard.isValidPosition(nextPosition)) continue;
                if (!EXTERNAL_AREA_MAP2[area].includes(nextPosition)) continue;
                positions.push(nextPosition);
                dfs(nextPosition);
            }
        };
        dfs(startPosition);
        return positions;
    }

    private placeFirstBlock(controlPositions: Position[], blockTable: ClusteredBlockTable): PlaceStatus[] {
        return controlPositions
            .map((controlPos) => {
                return blockTable.table.map((blocks, idx) => {
                    const block = blocks.at(-1);
                    if (!block) return [];
                    return block.shapes.map((shape) => {
                        const targetPositions = shape.deltas.map((delta) => controlPos.move(delta));
                        if (!UnionBoard.isValidArea(targetPositions)) return;
                        if (!this.board.isOccupiableArea(targetPositions)) return;
                        const board = this.board.copy();
                        const _blockTable = blockTable.copy();
                        targetPositions.forEach((pos) => board.setStatus(pos, CELL_STATUS.OCCUPIED, block));
                        _blockTable.table[idx].pop();
                        const linkedPositions = targetPositions
                            .reduce<Position[]>((acc, cur) => [...acc, ...board.getAdjacentPositions(cur)], [])
                            .filter((pos) => board.getCellFromPosition(pos).status === CELL_STATUS.TO_BE_OCCUPIED);
                        return {
                            board,
                            blockTable: _blockTable,
                            linkedPositions,
                            remainSize: this.plannedOccupiableArea - block.size,
                        };
                    });
                });
            })
            .flat(2)
            .reduce<PlaceStatus[]>((acc, cur) => {
                cur && acc.push(cur);
                return acc;
            }, []);
    }

    private isBlockPlacementPossible(board: UnionBoard, position: Position, blockTable: ClusteredBlockTable) {
        const blocks = blockTable.table.map((row) => row[row.length - 1]);
        for (const block of blocks) {
            for (const shape of block.shapes) {
                const transformations = shape.deltas.map((_, dIdx) => shape.getDeltasByIndex(dIdx));
                for (const deltas of transformations) {
                    const targetPositions = deltas.map((delta) => position.move(delta));
                    if (!UnionBoard.isValidArea(targetPositions)) continue;
                    if (!board.isOccupiableArea(targetPositions)) continue;
                    return true;
                }
            }
        }
        return false;
    }
}
