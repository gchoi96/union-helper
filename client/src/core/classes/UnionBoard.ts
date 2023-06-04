import {
    DEFAULT_AREA_HEIGHT,
    DEFAULT_AREA_WIDTH,
    EXTERNAL_AREA_MAP,
    EXTERNAL_AREA_MAP2,
    SQUARE_UNICODE,
    UNION_BOARD_HEIGHT,
    UNION_BOARD_WIDTH,
} from "@core/constants";
import { CELL_STATUS, EXTERNAL_AREA } from "@core/enums";
import { Delta } from "@core/types/Delta";
import Position from "@core/classes/Position";
import Cell from "./Cell";
import { BlockMap } from "../types/BlockMap";
import { getColorSquare } from "../utils";

export default class UnionBoard {
    static readonly vitalControlArea: Readonly<Position[]> = Object.values({
        NW: new Position(9, 10),
        NE: new Position(9, 11),
        SW: new Position(10, 10),
        SE: new Position(10, 11),
    });

    static readonly searchDirection: Readonly<Delta>[] = Object.values({
        N: { dy: -1, dx: 0 },
        E: { dy: 0, dx: 1 },
        W: { dy: 0, dx: -1 },
        S: { dy: 1, dx: 0 },
    });

    static readonly externalArea = EXTERNAL_AREA_MAP;

    static isValidArea(positions: Position[]) {
        return positions.every((position) => UnionBoard.isValidPosition(position));
    }

    static isValidPosition(position: Position) {
        const { y, x } = position;
        if (y < 0 || y > UNION_BOARD_HEIGHT + 1) return false;
        if (x < 0 || x > UNION_BOARD_WIDTH + 1) return false;
        return true;
    }

    static isOccupiableArea(cells: Cell[]) {
        return cells.every((cell) => cell?.status === CELL_STATUS.TO_BE_OCCUPIED);
    }

    private getDefaultBoard(): Cell[][] {
        return Array.from({ length: UNION_BOARD_HEIGHT }, () =>
            Array.from({ length: UNION_BOARD_WIDTH }, () => new Cell())
        );
    }
    private board: Cell[][] = this.getDefaultBoard();

    initAreaStatus(occupiableLevel: number) {
        this.board.forEach((row, rIdx) =>
            row.forEach((_, cIdx) => {
                const { dy, dx } = this.calcDistanceFromCenter(new Position(rIdx, cIdx));
                if (dy + 1 > DEFAULT_AREA_HEIGHT + occupiableLevel) return;
                if (dx + 1 > DEFAULT_AREA_WIDTH + occupiableLevel) return;
                this.board[rIdx][cIdx].status = CELL_STATUS.AVAILABLE;
            })
        );
    }

    simulate(blockMap: BlockMap) {
        this.placeFirstBlock(blockMap);
    }

    private placeFirstBlock(blockMap: BlockMap) {
        const shapeKeys = Object.keys(blockMap);
        UnionBoard.vitalControlArea.forEach((controlPosition) => {
            if (this.getCellFromPosition(new Position(1, 1))?.status !== CELL_STATUS.TO_BE_OCCUPIED) return;
            shapeKeys.forEach((key) => {
                if (!blockMap[key].length) return;
                const block = blockMap[key].at(-1);
                block?.shapes.forEach((shape) => {
                    const targetPositions = shape.deltas.map((delta) => controlPosition.move(delta));
                    if (!UnionBoard.isValidArea(targetPositions)) return;
                    const targetCells = targetPositions.map((position) => this.getCellFromPosition(position)!);
                    if (!UnionBoard.isOccupiableArea(targetCells)) return;
                    targetCells.forEach((cell) => {
                        cell.status = CELL_STATUS.OCCUPIED;
                        cell.occupyingBlock = block;
                    });
                    blockMap[key].pop();
                    const linkedPositions = targetPositions
                        .reduce<Position[]>(
                            (acc, cur) => [...acc, ...UnionBoard.searchDirection.map((delta) => cur.move(delta))],
                            []
                        )
                        .filter((pos) => this.getCellFromPosition(pos).status === CELL_STATUS.TO_BE_OCCUPIED);
                });
            });
        });
    }

    private getCellFromPosition(position: Position) {
        return this.board[position.y][position.x];
    }

    setExternalAreaStatus(areas: EXTERNAL_AREA[], maxCount: number) {
        const positions = this.getAllOccupiedPositionsByAreas(areas, maxCount);
        this.resetCellStatus();
        positions.forEach((pos) => (this.board[pos.y][pos.x].status = CELL_STATUS.TO_BE_OCCUPIED));
    }

    private resetCellStatus() {
        this.board
            .flat()
            .filter((cell) => cell.status === CELL_STATUS.UNAVAILABLE)
            .forEach((cell) => {
                cell.status = CELL_STATUS.AVAILABLE;
                cell.occupyingBlock = null;
            });
    }

    private getPositionsToOccupyByArea(startPosition: Position, area: EXTERNAL_AREA) {
        const positions: Position[] = [];
        const history = new Set<Position>();
        const dfs = (position: Position) => {
            for (const delta of UnionBoard.searchDirection) {
                const nextPosition = position.move(delta);
                if (history.has(nextPosition)) continue;
                history.add(nextPosition);
                if (!this.isValidPosition(nextPosition)) continue;
                if (!EXTERNAL_AREA_MAP2[area].includes(nextPosition)) continue;
                positions.push(nextPosition);
                dfs(nextPosition);
            }
        };
        dfs(startPosition);
        return positions;
    }

    private calcStartPosition(area: EXTERNAL_AREA, selectedBlocks: Position[]) {
        const { intersectingArea } = UnionBoard.externalArea[area];
        for (let i = 0; i < intersectingArea.length; i++) {
            const intersectionPosition = intersectingArea[i];
            const nearbyPositions = UnionBoard.searchDirection.map((d) => intersectionPosition.move(d));
            for (let j = 0; j < nearbyPositions.length; j++) {
                const nearbyPosition = nearbyPositions[j];
                if (selectedBlocks.includes(nearbyPosition)) return nearbyPosition;
            }
        }
        return UnionBoard.externalArea[area].startPosition;
    }

    private getAllOccupiedPositionsByAreas(areas: EXTERNAL_AREA[], maxCount: number): Position[] {
        const result: Set<Position>[] = [];
        const dfs = (selectedPositions: Set<Position>, level: number) => {
            if (level === areas.length) {
                result.push(selectedPositions);
                return;
            }
            const area = areas[level];
            const areaInfo = UnionBoard.externalArea[area];
            const startPosition = this.calcStartPosition(area, Array.from(selectedPositions));
            const positions = this.getPositionsToOccupyByArea(startPosition, area);
            if (startPosition === areaInfo.startPosition) {
                const nearestControlPos = this.getNearestControlArea(area, Array.from(selectedPositions));
                for (const path of this.getConnectionPath(area, nearestControlPos)) {
                    const set = new Set<Position>([...Array.from(selectedPositions), ...path, ...positions]);
                    if (set.size > maxCount) {
                        result.push(selectedPositions);
                        return;
                    }
                    dfs(set, level + 1);
                }
                return;
            }
            const set = new Set([...Array.from(selectedPositions), ...positions]);
            dfs(set, level + 1);
        };
        dfs(new Set(), 0);
        return Array.from(result.reduce((acc, cur) => (acc.size > cur.size ? cur : acc)));
    }

    private isValidPosition(pos: Position) {
        const { y, x } = pos;
        if (y < 0 || y > this.board.length - 1) return false;
        if (x < 0 || x > this.board[0].length - 1) return false;
        return true;
    }

    private calcDistanceFromCenter(pos: Position): Delta {
        const center = this.calcCenterPosition();
        const dy = Math.floor(Math.abs(pos.y - center.y));
        const dx = Math.floor(Math.abs(pos.x - center.x));
        return { dy, dx };
    }

    private calcCenterPosition() {
        const rowCount = this.board.length;
        const colCount = this.board[0].length;
        const x = colCount % 2 ? colCount / 2 : (colCount - 1) / 2;
        const y = rowCount % 2 ? rowCount / 2 : (rowCount - 1) / 2;
        return { y, x };
    }

    private getConnectionPath(area: EXTERNAL_AREA, nearestControlPos: Position): Position[][] {
        const startPos = UnionBoard.externalArea[area].startPosition;
        const path1 = nearestControlPos.getPathBetweenPosition(startPos);
        const path2 = startPos.getPathBetweenPosition(nearestControlPos);
        return [path2, path1];
    }

    private getNearestControlArea(area: EXTERNAL_AREA, selectedBlocks: Position[]): Position {
        const occupiedControlCells = UnionBoard.vitalControlArea.filter((position) =>
            selectedBlocks.includes(position)
        );
        const targets = occupiedControlCells.length ? occupiedControlCells : UnionBoard.vitalControlArea;
        const startPos = UnionBoard.externalArea[area].startPosition;
        return startPos.getNearestPosition([...targets]);
    }

    toString(board = this.board) {
        return board.map((row) => row.map((cell) => getColorSquare(cell.status)).join(" ")).join("\n");
    }
}
