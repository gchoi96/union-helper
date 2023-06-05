import {
    DEFAULT_AREA_HEIGHT,
    DEFAULT_AREA_WIDTH,
    EXTERNAL_AREA_MAP,
    EXTERNAL_AREA_MAP2,
    UNION_BOARD_HEIGHT,
    UNION_BOARD_WIDTH,
} from "../constants";
import { CELL_STATUS, EXTERNAL_AREA } from "../enums";
import { UnionGrade } from "../types/UnionGrade";
import { calcUnionGrade, removeDuplicates } from "../utils";
import { Block } from "./Block";
import BlockList from "./BlockList";
import BlockMap from "./BlockMap";
import Position from "./Position";
import UnionBoard from "./UnionBoard";

export default class UnionManager {
    readonly occupiableSize: number;
    readonly blockList: BlockList;
    readonly remainingBlockCount;
    readonly grade: UnionGrade;

    private board: UnionBoard = new UnionBoard();

    private _priority: EXTERNAL_AREA[] = [];
    public get priority(): EXTERNAL_AREA[] {
        return [...this._priority];
    }

    constructor(blocks: Block[] | BlockList) {
        this.blockList = blocks instanceof BlockList ? blocks : new BlockList(blocks);
        this.grade = calcUnionGrade(this.blockList.getTotalLevel());
        this.remainingBlockCount = this.grade.blockCount ?? 9;
        this.occupiableSize = this.calcAvailableSize(this.grade.blockCount);
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
        console.log(this.occupiableSize);
        this.board.reset();
        positions.forEach((pos) => this.board.setStatus(pos, CELL_STATUS.TO_BE_OCCUPIED));
    }

    getPriority() {
        return [...this.priority];
    }

    simulate() {
        this.placeFirstBlock();
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

    private placeFirstBlock() {
        const blockMap = new BlockMap(this.blockList.getBlocks(this.grade.blockCount));
        const shapeKeys = Object.keys(blockMap);
        UnionBoard.vitalControlArea.forEach((controlPosition) => {
            if (this.board.getCellFromPosition(controlPosition).status !== CELL_STATUS.TO_BE_OCCUPIED) return;
            shapeKeys.forEach((key) => {
                if (!blockMap.get(key).length) return;
                const block = blockMap.get(key).at(-1);
                block?.shapes.forEach((shape) => {
                    const targetPositions = shape.deltas.map((delta) => controlPosition.move(delta));
                    if (!UnionBoard.isValidArea(targetPositions)) return;

                    const targetCells = targetPositions.map((position) => this.board.getCellFromPosition(position));
                    if (!UnionBoard.isOccupiableArea(targetCells)) return;

                    targetPositions.forEach((pos) => this.board.setStatus(pos, CELL_STATUS.OCCUPIED, block));
                    blockMap.get(key).pop();
                    const linkedPositions = targetPositions
                        .reduce<Position[]>((acc, cur) => [...acc, ...this.board.getAdjacentPositions(cur)], [])
                        .filter((pos) => this.board.getCellFromPosition(pos).status === CELL_STATUS.TO_BE_OCCUPIED);
                });
            });
        });
    }
}
