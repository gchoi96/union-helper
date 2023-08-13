import { BACKGROUND_COLOR, BORDER_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { border, flex, initSize } from "#styles/mixin";
import { css } from "@emotion/css";
import useBoard from "#hooks/useBoard";
import { useKey } from "#hooks/useKey";
import { CELL_STATUS } from "#enums/status";
import { MESSAGE } from "#constants/strings";
import { MouseEventHandler, useRef, useState } from "react";
import useCharacterList from "#hooks/useCharacterList";
import { Cell } from "#components/units/Cell";

export function Board() {
    const { generate } = useKey("cell");
    const { board, changeCellStatus, getSelectedCount } = useBoard();
    const { getOccupiableSize } = useCharacterList();
    const tableRef = useRef<HTMLTableElement>(null);
    const [dragStatus, setDragStatus] = useState(false);
    const onDragStart: MouseEventHandler = (e) => {
        const { clientX, clientY } = e;
        const elementAtMouse = document.elementFromPoint(clientX, clientY);
        if (!elementAtMouse) return;
        setDragStatus(true);
        (elementAtMouse as HTMLTableCellElement).click();
    };
    const onDragOver = () => setDragStatus(false);

    const toggleCellStatus = (rIdx: number, cIdx: number) => () => {
        const prevStatus = board[rIdx][cIdx].status;
        if (prevStatus === CELL_STATUS.UNAVAILABLE) return;
        const nextStatus = prevStatus === CELL_STATUS.AVAILABLE ? CELL_STATUS.TO_BE_OCCUPIED : CELL_STATUS.AVAILABLE;
        if (nextStatus === CELL_STATUS.TO_BE_OCCUPIED && getSelectedCount() + 1 > getOccupiableSize()) {
            alert(MESSAGE.ALREADY_SELECT_MAXIMUM_COUNT);
            setDragStatus(false);
            return;
        }
        changeCellStatus({ rIdx, cIdx, status: nextStatus });
    };

    const onCellMouseEnter: MouseEventHandler<HTMLElement> = (e) => {
        if (!dragStatus) return;
        e.currentTarget.click();
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
            onMouseDown={onDragStart}
            onMouseUp={onDragOver}
            ref={tableRef}
        >
            <div
                className={css`
                    ${initSize("484px", "440px")}
                `}
            >
                {board.map((row, rIdx) => (
                    <div>
                        {row.map((cell, cIdx) => (
                            <Cell
                                key={generate()}
                                status={cell.status}
                                toggleCellStatus={toggleCellStatus(rIdx, cIdx)}
                                onMouseEnter={onCellMouseEnter}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
