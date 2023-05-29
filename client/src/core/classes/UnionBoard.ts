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
import { Cell } from "@core/types/Cell";
import { Delta } from "../types/Delta";
import { calcUnionGrade } from "../utils";
import BlockList from "./BlockList";
import Position from "./Position";

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

    readonly occupiableSize: number;

    private remainingBlockCount = 9;
    private blockList: BlockList;

    private board: Cell[][] = Array.from({ length: UNION_BOARD_HEIGHT }, () =>
        Array.from({ length: UNION_BOARD_WIDTH }, () => ({
            status: CELL_STATUS.UNAVAILABLE,
            occupyingBlock: null,
        }))
    );
    constructor(blockList: BlockList = new BlockList([])) {
        const grade = calcUnionGrade(blockList.getTotalLevel());
        this.blockList = blockList;
        this.remainingBlockCount = grade.blockCount;
        this.occupiableSize = blockList.getAvailableSize(grade.blockCount);
        this.initAreaStatus(grade.occupiableLevel);
    }

    selectOccupiedAreas(areas: EXTERNAL_AREA[]) {
        const steps: Set<Position> = new Set();
        for (const area of areas) {
            let route: Position[] = [];
            const areaInfo = UnionBoard.externalArea[area];
            let startPosition = null;

            areaInfo.intersectingArea.some((position) =>
                UnionBoard.searchDirection.some(({ dx, dy }) => {
                    if (!steps.has(new Position(position.y + dy, position.x + dx)))
                        return false;

                    startPosition = position;
                    route.push(startPosition);
                    return true;
                })
            );

            if (!startPosition) {
                startPosition = areaInfo.startPosition;
                route = this.getConnectionPath(area);
            }
            const asd = ((start: Position) => {
                const positions: Position[] = [];
                const history = new Set<Position>();
                const inner = (position: Position) => {
                    for (const { dx, dy } of UnionBoard.searchDirection) {
                        const nextPosition = new Position(
                            position.y + dy,
                            position.x + dx
                        );
                        if (history.has(nextPosition)) continue;
                        history.add(nextPosition);
                        if (!this.isValidPosition(nextPosition)) continue;
                        if (!EXTERNAL_AREA_MAP2[area].includes(nextPosition)) continue;
                        positions.push(nextPosition);
                        inner(nextPosition);
                    }
                };
                inner(start);
                return positions;
            })(startPosition);
            route = route.concat(asd);
            for (let i = 0; i < route.length; i++) {
                if (steps.size >= this.occupiableSize) break;
                steps.add(route[i]);
            }
        }

        steps.forEach((position) => {
            this.board[position.y][position.x].status = CELL_STATUS.TO_BE_OCCUPIED;
            this.t_display();
        });
    }

    private initAreaStatus(occupiableLevel: number) {
        this.board.forEach((row, rIdx) =>
            row.forEach((_, cIdx) => {
                const { dy, dx } = this.calcDistanceFromCenter(new Position(rIdx, cIdx));
                if (dy + 1 > DEFAULT_AREA_HEIGHT + occupiableLevel) return;
                if (dx + 1 > DEFAULT_AREA_WIDTH + occupiableLevel) return;
                this.board[rIdx][cIdx].status = CELL_STATUS.AVAILABLE;
            })
        );
    }

    private isValidPosition(pos: Position) {
        const { y, x } = pos;
        if (y < 0 || y > this.board.length - 1) return false;
        if (x < 0 || x > this.board[0].length - 1) return false;
        return true;
    }

    private calcCenterPosition() {
        const rowCount = this.board.length;
        const colCount = this.board[0].length;
        const x = colCount % 2 ? colCount / 2 : (colCount - 1) / 2;
        const y = rowCount % 2 ? rowCount / 2 : (rowCount - 1) / 2;
        return { y, x };
    }

    private calcDistanceFromCenter(pos: Position): Delta {
        const center = this.calcCenterPosition();
        const dy = Math.floor(Math.abs(pos.y - center.y));
        const dx = Math.floor(Math.abs(pos.x - center.x));
        return { dy, dx };
    }

    private getConnectionPath(area: EXTERNAL_AREA): Position[] {
        const nearestControlArea = this.getNearestControlArea(area);
        const startPos = UnionBoard.externalArea[area].startPosition;
        const path = startPos.getPathBetweenPosition(nearestControlArea);
        return [...path, startPos];
    }

    private getNearestControlArea(area: EXTERNAL_AREA): Position {
        const occupiedControlCells = UnionBoard.vitalControlArea.filter(
            (position) =>
                this.getBlockFromPosition(position).status === CELL_STATUS.TO_BE_OCCUPIED
        );
        const targets = occupiedControlCells.length
            ? occupiedControlCells
            : UnionBoard.vitalControlArea;
        const startPos = UnionBoard.externalArea[area].startPosition;
        return startPos.getNearestPosition([...targets]);
    }

    private getBlockFromPosition(position: Position) {
        return this.board[position.y][position.x];
    }

    // test
    t_display() {
        console.log(
            this.board
                .map((row) =>
                    row
                        .map((cell) => {
                            cell.status === CELL_STATUS.UNAVAILABLE ? "█" : "0";
                            switch (cell.status) {
                                case CELL_STATUS.AVAILABLE:
                                    return SQUARE_UNICODE.YELLOW;
                                case CELL_STATUS.OCCUPIED:
                                    return SQUARE_UNICODE.BLUE;
                                case CELL_STATUS.TO_BE_OCCUPIED:
                                    return SQUARE_UNICODE.GREEN;
                                case CELL_STATUS.UNAVAILABLE:
                                    return SQUARE_UNICODE.RED;
                            }
                        })
                        .join(" ")
                )
                .join("\n")
        );
    }
}
