import Position from "#classes/Position";
import { EXTERNAL_AREA_MAP } from "#constants/maps";
import { UNION_BOARD_HEIGHT, UNION_BOARD_WIDTH } from "#constants/numbers";
import { CELL_STATUS } from "#enums/status";
import { Delta } from "#types/delta";
import Cell from "#classes/Cell";
import { EXTERNAL_AREA } from "#enums/externalArea";
import { Block } from "#classes/Block";
import { ERROR } from "#constants/strings";

export default class UnionBoard {
    static readonly controlArea: Readonly<Position[]> = Object.values({
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
        if (y < 0 || y > UNION_BOARD_HEIGHT - 1) return false;
        if (x < 0 || x > UNION_BOARD_WIDTH - 1) return false;
        return true;
    }

    isPlacementPossible(positions: Position[]) {
        if (!UnionBoard.isValidArea(positions)) return false;
        if (!this.isOccupiableArea(positions)) return false;
        return true;
    }

    isOccupiableArea(positions: Position[]) {
        return positions
            .map((position) => this.getCellFromPosition(position))
            .every((cell) => cell?.status === CELL_STATUS.TO_BE_OCCUPIED);
    }

    private getDefaultBoard(): Cell[][] {
        return Array.from({ length: UNION_BOARD_HEIGHT }, () =>
            Array.from({ length: UNION_BOARD_WIDTH }, () => new Cell())
        );
    }

    private _board: Cell[][];

    get board() {
        return this._board.map((row) => [...row]);
    }

    constructor(board?: Cell[][]) {
        this._board = board ?? this.getDefaultBoard();
    }

    getToBeOccupiedPositions() {
        const positions: Position[] = [];
        for (let y = 0; y < this._board.length; y++) {
            for (let x = 0; x < this._board[0].length; x++) {
                const position = new Position(y, x);
                if (this.getCellFromPosition(position).status !== CELL_STATUS.TO_BE_OCCUPIED) continue;
                positions.push(position);
            }
        }
        return positions;
    }

    getCellFromPosition(position: Position) {
        return this._board[position.y][position.x];
    }
    copy() {
        const copiedBoard = new UnionBoard();
        this._board.forEach((_, y) => {
            this._board[y].forEach((_, x) => {
                const pos = new Position(y, x);
                const origin = this.getCellFromPosition(pos);
                const copy = copiedBoard.getCellFromPosition(pos);
                copy.status = origin.status;
                origin.occupyingBlock && (copy.occupyingBlock = origin.occupyingBlock);
            });
        });
        return copiedBoard;
    }

    reset() {
        this._board
            .flat()
            .filter((cell) => cell.status === CELL_STATUS.UNAVAILABLE)
            .forEach((cell) => {
                cell.status = CELL_STATUS.AVAILABLE;
                cell.occupyingBlock = null;
            });
    }

    calcStartPosition(area: EXTERNAL_AREA, selectedBlocks: Position[]) {
        const { borderPositions } = UnionBoard.externalArea[area];
        for (let i = 0; i < borderPositions.length; i++) {
            const intersectionPosition = borderPositions[i];
            const nearbyPositions = UnionBoard.searchDirection.map((d) => intersectionPosition.move(d));
            for (let j = 0; j < nearbyPositions.length; j++) {
                const nearbyPosition = nearbyPositions[j];
                if (selectedBlocks.includes(nearbyPosition)) return nearbyPosition;
            }
        }
        return UnionBoard.externalArea[area].startPosition;
    }

    getNearestControlPosition(area: EXTERNAL_AREA, selectedBlocks: Position[]): Position {
        const occupiedControlCells = UnionBoard.controlArea.filter((position) => selectedBlocks.includes(position));
        const targets = occupiedControlCells.length ? occupiedControlCells : UnionBoard.controlArea;
        const startPos = UnionBoard.externalArea[area].startPosition;
        return startPos.getNearestPosition([...targets]);
    }

    removeBlock(positions: Position[]) {
        positions.forEach((pos) => {
            const cell = this.getCellFromPosition(pos);
            cell.status = CELL_STATUS.TO_BE_OCCUPIED;
            cell.occupyingBlock = null;
        });
    }

    place(block: Block, positions: Position[]) {
        positions.forEach((pos) => {
            const cell = this.getCellFromPosition(pos);
            cell.status = CELL_STATUS.OCCUPIED;
            cell.occupy(block);
        });
    }

    setStatus(pos: Position, status: CELL_STATUS, block?: Block) {
        if (status === CELL_STATUS.OCCUPIED && !block) throw new Error(ERROR.MISSING_BLOCK);
        const cell = this.getCellFromPosition(pos);
        cell.status = status;
        status === CELL_STATUS.OCCUPIED && block && cell.occupy(block);
    }

    toggleStatus(pos: Position) {
        const cell = this.getCellFromPosition(pos);
        if (![CELL_STATUS.TO_BE_OCCUPIED, CELL_STATUS.AVAILABLE].includes(cell.status)) return;
        cell.status = cell.status === CELL_STATUS.AVAILABLE ? CELL_STATUS.TO_BE_OCCUPIED : CELL_STATUS.AVAILABLE;
    }

    getAdjacentPositions(position: Position) {
        return UnionBoard.searchDirection
            .map((delta) => position.move(delta))
            .filter((pos) => UnionBoard.isValidPosition(pos));
    }

    calcDistanceFromCenter(pos: Position): Delta {
        const center = this.calcCenterPosition();
        const dy = Math.floor(Math.abs(pos.y - center.y));
        const dx = Math.floor(Math.abs(pos.x - center.x));
        return { dy, dx };
    }

    private calcCenterPosition() {
        const rowCount = this._board.length;
        const colCount = this._board[0].length;
        const x = colCount % 2 ? colCount / 2 : (colCount - 1) / 2;
        const y = rowCount % 2 ? rowCount / 2 : (rowCount - 1) / 2;
        return { y, x };
    }

    toString(){
        const hashStringToNumber = (str: string, maxNum: number) => {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash += str.charCodeAt(i);
            }
            return (hash % maxNum) + 1;
        };
        
        const stringToUnicode = (str: string) => {
            const unicode = ["🟥", "🟧", "🟦", "🟪", "🟢", "🟠", "🟣", "🟫", "🟤", "⬛"];
            const hash = hashStringToNumber(str, unicode.length);
        
            return unicode[hash];
        };
        const SQUARE_UNICODE = {
            RED: "\uD83D\uDFE5",
            BLUE: "🟣️",
            // BLUE: "\uD83D\uDFE6",
            GREEN: "\uD83D\uDFE9",
            YELLOW: "\uD83D\uDFE8",
            ORANGE: "\uD83D\uDFE7",
        };
         const getColorSquare = (status: CELL_STATUS) => {
            switch (status) {
                case CELL_STATUS.AVAILABLE:
                    return SQUARE_UNICODE.YELLOW;
                case CELL_STATUS.OCCUPIED:
                    return SQUARE_UNICODE.BLUE;
                case CELL_STATUS.TO_BE_OCCUPIED:
                    return SQUARE_UNICODE.GREEN;
                case CELL_STATUS.UNAVAILABLE:
                    return SQUARE_UNICODE.RED;
            }
        };
        return this.board
        .map((row) =>
            row
                .map((cell) => {
                    if (cell.status === CELL_STATUS.OCCUPIED)
                        return stringToUnicode(cell.occupyingBlock?.character.nickname ?? "");
                    return getColorSquare(cell.status);
                })
                .join(" ")
        )
        .join("\n");
    }
}
