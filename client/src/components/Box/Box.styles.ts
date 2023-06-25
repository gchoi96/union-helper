import { BACKGROUND_COLOR, TEXT_COLOR } from "@/styles/color";
import { ContainerStyle } from "@/styles/mixin";
import styled from "@emotion/styled";

export const Container = styled.div<{ width: string; height: string }>`
    ${ContainerStyle}
    background: ${BACKGROUND_COLOR.DARK_GREEN};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.02rem;
    color: ${TEXT_COLOR.BOX_CONTENT};
    > :first-child {
        margin-bottom: 1.2rem;
    }
`;
