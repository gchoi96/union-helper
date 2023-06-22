import { CELL_STATUS } from "@/core/enums";
import { CELL_COLOR } from "@/styles/color";
import { border, initSize } from "@/styles/mixin";
import styled from "@emotion/styled";
export const CheckBox = styled.td<{ status: CELL_STATUS; size: number | string }>`
    ${({ size }) => initSize(size, size)}
    ${border(`0.05rem`, `#888888`)}
    margin: 0;
    background: ${({ status }) => CELL_COLOR[status].NORMAL};
    :hover {
        background: ${({ status }) => CELL_COLOR[status].HOVER};
    }
`;
