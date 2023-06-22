import styled from "@emotion/styled";

export const Container = styled.div<{ width: string; height: string }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    /* > div {
        width: 100%;
        height: 100%;
    } */
`;
