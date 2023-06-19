import { TEXT_COLOR } from "@/styles/color";
import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.p<{ size?: string; color?: string }>`
    font-size: ${({ size }) => size};
    font-weight: 700;
    color: ${({ color }) => color ?? TEXT_COLOR.WHITE};
    font-weight: 700;
`;

export const Content = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > * {
        margin-left: 1rem;
    }
`;
