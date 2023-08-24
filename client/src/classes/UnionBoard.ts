import Position from "#classes/Position";
import { EXTERNAL_AREA_MAP } from "#constants/maps";
import { UNION_BOARD_HEIGHT, UNION_BOARD_WIDTH } from "#constants/numbers";
import { CELL_STATUS } from "#enums/status";
import { Delta } from "#types/delta";
import Cell from "#classes/Cell";
import { Block } from "#classes/Block";
import { CSSProperties } from "react";

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

    private isOccupiableArea(positions: Position[]) {
        return positions
            .map((position) => this.getCellFromPosition(position))
            .every((cell) => cell?.status === CELL_STATUS.SELECTED);
    }

    private _board: Cell[][];

    get board() {
        return this._board.map((row) => [...row]);
    }

    constructor(board: Cell[][]) {
        this._board = board;
    }

    getCellFromPosition(position: Position) {
        return this._board[position.y][position.x];
    }
    copy() {
        const copiedBoard = new UnionBoard(this._board.map((row) => row.map((cell) => cell.copy())));
        return copiedBoard;
    }

    removeBlock(positions: Position[]) {
        positions.forEach((pos) => {
            const cell = this.getCellFromPosition(pos);
            cell.status = CELL_STATUS.SELECTED;
            cell.occupyingBlock = null;
        });
    }

    place(block: Block, positions: Position[]) {
        positions.forEach((pos) => {
            const cell = this.getCellFromPosition(pos);
            cell.place(block);
        });
    }

    updateCSSProperties() {
        this._board.forEach((row) =>
            row.forEach((cell) => {
                if (!cell.occupyingBlock) return;
                const position = cell.position;
                let css: CSSProperties = { ...cell.css, borderColor: "white" };
                const direction = ["Top", "Right", "Left", "Bottom"];
                UnionBoard.searchDirection.forEach((delta, idx) => {
                    const _position = position.move(delta);
                    if (!UnionBoard.isValidPosition(_position)) return;
                    if (this.getCellFromPosition(_position).occupyingBlock !== cell.occupyingBlock) return;
                    css = { ...css, [`border${direction[idx]}`]: "none" };
                });

                cell.css = css;
            })
        );
    }

    setGroup() {
        this.board.reduce((map, row, rIdx) => {
            row.forEach((cell, cIdx) => {
                if (!cell.occupyingBlock) return;
                if (!map.has(cell.occupyingBlock)) map.set(cell.occupyingBlock, []);
                const group = map.get(cell.occupyingBlock);
                group!.push(new Position(rIdx, cIdx));
                cell.group = group!;
            });
            return map;
        }, new Map<Block, Position[]>());
    }

    toString() {
        const SQUARE_UNICODE = {
            BLUE: "\uD83D\uDFE6",
            GREEN: "\uD83D\uDFE9",
            YELLOW: "\uD83D\uDFE8",
        };
        const getColorSquare = (status: CELL_STATUS) => {
            switch (status) {
                case CELL_STATUS.NOT_SELECTED:
                    return SQUARE_UNICODE.YELLOW;
                case CELL_STATUS.PLACED:
                    return SQUARE_UNICODE.BLUE;
                case CELL_STATUS.SELECTED:
                    return SQUARE_UNICODE.GREEN;
            }
        };
        return this.board
            .map((row) =>
                row
                    .map((cell) => {
                        if (cell.status === CELL_STATUS.PLACED)
                            return SQUARE_UNICODE.BLUE;
                        return getColorSquare(cell.status);
                    })
                    .join(" ")
            )
            .join("\n");
    }

    static getAdjacentPositions(position: Position) {
        return UnionBoard.searchDirection
            .map((delta) => position.move(delta))
            .filter((pos) => UnionBoard.isValidPosition(pos));
    }
}
