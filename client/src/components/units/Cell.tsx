import { CELL_STATUS } from "#enums/status";
import { HTMLAttributes, MouseEventHandler } from "react";
import { BORDER_COLOR, CELL_COLOR } from "#constants/colors";
import { css } from "@emotion/css";
import { border, initSize } from "#styles/mixin";

interface Props extends HTMLAttributes<HTMLTableCellElement> {
    status: CELL_STATUS;
    onMouseEnter: MouseEventHandler;
    size?: string;
}

export function Cell({ size = "22px", status, onMouseEnter, ...props }: Props) {
    return (
        <td
            className={css`
                ${initSize(size, size)};
                ${border("0.5px", BORDER_COLOR.CELL)};
                margin: 0;
                background: ${CELL_COLOR[status].NORMAL};
                :hover {
                    background: ${CELL_COLOR[status].HOVER};
                }
                cursor: pointer;
            `}
            onMouseEnter={onMouseEnter}
            {...props}
        />
    );
}
