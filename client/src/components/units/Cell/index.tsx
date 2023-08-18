import { HTMLAttributes } from "react";
import { CELL_COLOR } from "#constants/colors";
import CellData from "#classes/Cell";
import { CELL_STATUS } from "#enums/status";
import { JOB_GROUP } from "#enums/job";
import * as S from "./styles";
interface Props extends HTMLAttributes<HTMLTableCellElement> {
    size?: string;
    data: CellData;
    isHovered: boolean;
}

export function Cell({ data, isHovered, ...props }: Props) {
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
        <S.Cell
            hoveredColor={cellColor.HOVER}
            normalColor={cellColor.NORMAL}
            isHovered={isHovered}
            style={data.css}
            {...props}
        />
    );
}
