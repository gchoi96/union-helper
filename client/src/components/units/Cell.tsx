import { HTMLAttributes, MouseEventHandler } from "react";
import { BORDER_COLOR, CELL_COLOR } from "#constants/colors";
import { css } from "@emotion/css";
import { border, initSize } from "#styles/mixin";
import CellData from "#classes/Cell";
import { CELL_STATUS } from "#enums/status";
import { JOB_GROUP } from "#enums/job";
interface Props extends HTMLAttributes<HTMLTableCellElement> {
    onMouseEnter: MouseEventHandler;
    size?: string;
    data: CellData;
    isHover: boolean;
}

export function Cell({ size = "22px", data, isHover, onMouseEnter, ...props }: Props) {
    const cellColor = (() => {
        if (data.status !== CELL_STATUS.OCCUPIED) return CELL_COLOR[data.status];
        switch (data.occupyingBlock?.character.job?.group) {
            case JOB_GROUP.도적:
                return CELL_COLOR[CELL_STATUS.OCCUPIED][JOB_GROUP.도적];
            case JOB_GROUP.궁수:
                return CELL_COLOR[CELL_STATUS.OCCUPIED][JOB_GROUP.궁수];
            case JOB_GROUP.전사:
                return CELL_COLOR[CELL_STATUS.OCCUPIED][JOB_GROUP.전사];
            case JOB_GROUP.해적:
                return CELL_COLOR[CELL_STATUS.OCCUPIED][JOB_GROUP.해적];
            case JOB_GROUP.마법사:
                return CELL_COLOR[CELL_STATUS.OCCUPIED][JOB_GROUP.마법사];
            case JOB_GROUP.제논:
                return CELL_COLOR[CELL_STATUS.OCCUPIED][JOB_GROUP.제논];
            default:
                return CELL_COLOR[CELL_STATUS.OCCUPIED][JOB_GROUP.궁수];
        }
    })();
    return (
        <td
            className={css`
                ${initSize(size, size)};
                ${border("0.2px", BORDER_COLOR.CELL)};
                margin: 0;
                background: ${isHover ? cellColor.HOVER : cellColor.NORMAL};
                :hover {
                    background: ${cellColor.HOVER};
                }
                cursor: pointer;
            `}
            onMouseEnter={onMouseEnter}
            style={data.css}
            {...props}
        />
    );
}
