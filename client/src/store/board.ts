import Cell from "#classes/Cell";
import { UNION_BOARD_HEIGHT, UNION_BOARD_WIDTH } from "#constants/numbers";
import { atom } from "recoil";

const boardState = atom<Cell[][]>({
    key: "board",
    default: new Array(UNION_BOARD_HEIGHT).fill(new Array(UNION_BOARD_WIDTH).fill(new Cell())),
});

export default boardState;
