import { Block } from "#classes/Block";
import Cell from "#classes/Cell";
import UnionBoard from "#classes/UnionBoard";
import UnionManager from "#classes/UnionManager";
import { EXTERNAL_AREA } from "#enums/externalArea";
import { CELL_STATUS } from "#enums/status";
import boardState from "#store/board";
import { useRecoilState, useResetRecoilState } from "recoil";
import useCharacterList from "./useCharacterList";

export default function useBoard() {
    const [board, setBoard] = useRecoilState(boardState);
    const reset = useResetRecoilState(boardState);
    const { getSelectedList } = useCharacterList();
    const changeCellStatus = ({ rIdx, cIdx, status }: { rIdx: number; cIdx: number; status: CELL_STATUS }) => {
        const newBoard = board.map((row) => row.map((cell) => cell.copy()));
        newBoard[rIdx][cIdx].changeStatus(status);
        setBoard(newBoard);
    };

    const getSelectedCount = () => {
        return board.reduce((total, row) => {
            return total + row.reduce((total, cell) => total + (cell.status === CELL_STATUS.TO_BE_OCCUPIED ? 1 : 0), 0);
        }, 0);
    };

    const calcValuePerCell = (type: EXTERNAL_AREA) => {
        switch (type) {
            case EXTERNAL_AREA.획득경험치:
                return 0.25;
            case EXTERNAL_AREA.크리티컬데미지:
                return 0.5;
            default:
                return 1;
        }
    };

    const getAbilityList = () => {
        return board
            .map((row) =>
                row
                    .filter(
                        (cell) =>
                            cell.ability && [CELL_STATUS.OCCUPIED, CELL_STATUS.TO_BE_OCCUPIED].includes(cell.status)
                    )
                    .map((cell) => cell.ability!)
            )
            .flat()
            .reduce<{ [key: string]: number }>((acc, cur) => {
                acc[cur] = (acc[cur] ?? 0) + calcValuePerCell(cur);
                return acc;
            }, {});
    };

    const updateBoard = (board: Cell[][]) => {
        setBoard(board);
    };

    const simulate = () => {
        const unionManager = new UnionManager(
            getSelectedList().map((character) => Block.blockFactory(character)),
            new UnionBoard(board)
        );
        return unionManager.simulate();
    };

    return { board, getAbilityList, setBoard, changeCellStatus, getSelectedCount, reset, simulate, updateBoard };
}
