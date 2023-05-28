import { DEFAULT_AREA_HEIGHT, DEFAULT_AREA_WIDTH, UNION_BOARD_HEIGHT, UNION_BOARD_WIDTH } from "@core/constants";
import { CELL_STATUS } from "@core/enums";
import { Cell } from "@core/types/Cell";
import { Delta, Position } from "@core/types/Position";
import { UnionGrade } from "@core/types/UnionGrade";

export default class UnionBoard {
    static readonly vitalControlArea: Readonly<Position>[] = Object.values({
        NW: { y: 9, x: 10 },
        NE: { y: 9, x: 11 },
        SW: { y: 10, x: 10 },
        SE: { y: 10, x: 11 },
    });

    static readonly searchDirection: Readonly<Delta>[] = Object.values({
        N: { dy: -1, dx: 0 },
        E: { dy: 0, dx: 1 },
        W: { dy: 0, dx: -1 },
        S: { dy: 1, dx: 0 },
    });

    private remainingBlockCount = 9;
    private board: Cell[][] = Array.from({ length: UNION_BOARD_HEIGHT }, () =>
        Array.from({ length: UNION_BOARD_WIDTH }, () => ({ status: CELL_STATUS.UNAVAILABLE, occupyingBlock: null }))
    );

    constructor(grade: UnionGrade) {
        this.remainingBlockCount = grade.blockCount;
        this.initAreaStatus(grade.occupiableLevel);
    }

    private initAreaStatus(occupiableLevel: number) {
        this.board.forEach((row, rIdx) =>
            row.forEach((_, cIdx) => {
                const { dy, dx } = this.calcDistanceFromCenter({ y: rIdx, x: cIdx });
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

    // test
    t_display() {
        console.log(this.board.map((row) => row.map((cell) => (cell.status === CELL_STATUS.UNAVAILABLE ? "#" : "0")).join(" ")).join("\n"));
    }
}
