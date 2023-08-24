import styled from "@emotion/styled";
import { initSize, border } from "#styles/mixin";
import { BORDER_COLOR } from "#constants/colors";
interface CellProps {
    normalColor: string;
    hoveredColor: string;
    isHovered: boolean;
}
export const Cell = styled.td<CellProps>`
    ${initSize("22px", "22px")}
    ${border("0.2px", BORDER_COLOR.CELL)};
    margin: 0;
    background: ${({ isHovered, normalColor, hoveredColor }) => (isHovered ? hoveredColor : normalColor)};
    :hover {
        background: ${({ hoveredColor }) => hoveredColor};
    }
    cursor: pointer;
`;
