import { BACKGROUND_COLOR, BORDER_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { border, flex, initSize } from "#styles/mixin";
import { css } from "@emotion/css";
import useBoard from "#hooks/useBoard";
import { CELL_STATUS } from "#enums/status";
import { MESSAGE } from "#constants/strings";
import { MouseEventHandler, useState } from "react";
import useCharacterList from "#hooks/useCharacterList";
import { Cell } from "#components/units/Cell";

export function Board() {
    const { board, changeCellStatus, getSelectedCount } = useBoard();
    const { getOccupiableSize } = useCharacterList();
    const [dragStatus, setDragStatus] = useState({ dragging: false, target: CELL_STATUS.UNAVAILABLE });

    const onMouseDown = (rIdx: number, cIdx: number) => () => {
        setDragStatus({ dragging: true, target: board[rIdx][cIdx].status });
        toggleCellStatus(rIdx, cIdx)();
    };
    const onMouseUp = () => setDragStatus({ dragging: false, target: CELL_STATUS.UNAVAILABLE });

    const toggleCellStatus = (rIdx: number, cIdx: number) => () => {
        const prevStatus = board[rIdx][cIdx].status;
        if (prevStatus === CELL_STATUS.UNAVAILABLE) return;
        const nextStatus = prevStatus === CELL_STATUS.AVAILABLE ? CELL_STATUS.TO_BE_OCCUPIED : CELL_STATUS.AVAILABLE;
        if (nextStatus === CELL_STATUS.TO_BE_OCCUPIED && getSelectedCount() + 1 > getOccupiableSize()) {
            alert(MESSAGE.ALREADY_SELECT_MAXIMUM_COUNT);
            setDragStatus({ dragging: false, target: CELL_STATUS.UNAVAILABLE });
            return;
        }
        changeCellStatus({ rIdx, cIdx, status: nextStatus });
    };

    const onMouseEnter =
        (rIdx: number, cIdx: number): MouseEventHandler<HTMLElement> =>
        () => {
            if (!dragStatus.dragging || board[rIdx][cIdx].status !== dragStatus.target) return;
            toggleCellStatus(rIdx, cIdx)();
        };

    return (
        <div
            className={css`
                ${flex({
                    direction: FLEX_DIRECTION.COLUMN,
                    justifyContent: JUSTIFY_CONTENT.CENTER,
                    alignItems: ALIGN_ITEMS.CENTER,
                })};
                ${border("2px", BORDER_COLOR.DARK_ORANGE, "10px")};
                background: ${BACKGROUND_COLOR.DARK_GREEN};
                color: red;
                padding: 16px 47px;
            `}
        >
            <div
                className={css`
                    ${initSize("484px", "440px")};
                `}
            >
                {board.map((row, rIdx) => (
                    <div>
                        {row.map((cell, cIdx) => (
                            <Cell
                                id={`${rIdx}_${cIdx}`}
                                key={`${rIdx}_${cIdx}`}
                                status={cell.status}
                                onMouseDown={onMouseDown(rIdx, cIdx)}
                                onMouseEnter={onMouseEnter(rIdx, cIdx)}
                                onMouseUp={onMouseUp}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
