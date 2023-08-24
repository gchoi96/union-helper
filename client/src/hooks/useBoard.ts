import Cell from "#classes/Cell";
import { EXTERNAL_AREA } from "#enums/externalArea";
import { CELL_STATUS } from "#enums/status";
import boardState from "#store/board";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useAlert } from "./useAlert";
import useCharacterList from "./useCharacterList";
export default function useBoard() {
    const [board, setBoard] = useRecoilState(boardState);
    const reset = useResetRecoilState(boardState);
    const alert = useAlert();
    const { getSelectedList } = useCharacterList();
    const changeCellStatus = ({ rIdx, cIdx, status }: { rIdx: number; cIdx: number; status: CELL_STATUS }) => {
        setBoard((prev) => {
            const newBoard = prev.map((row) => row.map((cell) => cell.copy()));
            newBoard[rIdx][cIdx].changeStatus(status);
            return newBoard;
        });
    };

    const getSelectedCount = () => {
        return board.reduce((total, row) => {
            return total + row.reduce((total, cell) => total + (cell.status !== CELL_STATUS.NOT_SELECTED ? 1 : 0), 0);
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
                    .filter((cell) => cell.ability && cell.status !== CELL_STATUS.NOT_SELECTED)
                    .map((cell) => cell.ability!)
            )
            .flat()
            .reduce<{ [key: string]: number }>((acc, cur) => {
                acc[cur] = (acc[cur] ?? 0) + calcValuePerCell(cur);
                return acc;
            }, {});
    };

    const updateBoard = (board: Cell[][]) => {
        board.forEach((row, rIdx) => row.forEach((cell, cIdx) => (cell.ability = board[rIdx][cIdx].ability)));
        setBoard(board);
    };

    const simulate = () => {
        const worker = new Worker(new URL("../workers/place.ts", import.meta.url));
        worker.postMessage({ characters: getSelectedList(), board: JSON.parse(JSON.stringify(board)) });
        worker.onmessage = ({ data }: MessageEvent<Cell[][] | null>) => {
            if (data === null) {
                alert("가능한 배치가 존재하지 않습니다.");
                return;
            }
            updateBoard(data as Cell[][]);
        };
    };

    const removeBlocks = () => {
        setBoard(
            board.map((row) =>
                row.map((cell) => {
                    let { position, ability, status } = cell;
                    status = status === CELL_STATUS.NOT_SELECTED ? CELL_STATUS.NOT_SELECTED : CELL_STATUS.SELECTED;
                    return new Cell(position, ability, status);
                })
            )
        );
    };

    return {
        board,
        getAbilityList,
        removeBlocks,
        setBoard,
        changeCellStatus,
        getSelectedCount,
        reset,
        simulate,
        updateBoard,
    };
}
