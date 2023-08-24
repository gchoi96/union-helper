import Cell from "#classes/Cell";
import Position from "#classes/Position";
import { EXTERNAL_AREA_MAP } from "#constants/maps";
import { UNION_BOARD_HEIGHT, UNION_BOARD_WIDTH } from "#constants/numbers";
import { EXTERNAL_AREA } from "#enums/externalArea";
import { atom } from "recoil";

const boardState = atom<Cell[][]>({
    key: "board",
    default: Array.from({ length: UNION_BOARD_HEIGHT }, (_, rIdx) =>
        Array.from({ length: UNION_BOARD_WIDTH }, (_, cIdx) => {
            const externalArea =
                Object.entries(EXTERNAL_AREA_MAP).find(([_, value]) =>
                    value.positions.includes(new Position(rIdx, cIdx))
                )?.[0] ?? undefined;
            return new Cell(new Position(rIdx, cIdx), externalArea as EXTERNAL_AREA);
        })
    ),
});

export default boardState;
