import { BORDER_COLOR, SHADOW_COLOR, TEXT_COLOR } from "#constants/colors";
import styled from "@emotion/styled";
interface TooltipProps {
    position: { x: number; y: number };
}
export const Container = styled.div<TooltipProps>`
    position: absolute;
    background: ${SHADOW_COLOR.BLACK};
    color: ${TEXT_COLOR.WHITE};
    padding: 4px 8px;
    border: 1px solid ${BORDER_COLOR.GRAY};
    border-radius: 10px;
    left: ${({ position: { x } }) => `${x}px`};
    top: ${({ position: { y } }) => `${y}px`};
    z-index: 100;
    font-size: 10px;
`;
