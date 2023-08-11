import { CELL_STATUS } from "#enums/status";
import boardState from "#store/board";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function useBoard() {
    const [board, setBoard] = useRecoilState(boardState);
    const reset = useResetRecoilState(boardState)
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

    return { board, setBoard, changeCellStatus, getSelectedCount,reset };
}
