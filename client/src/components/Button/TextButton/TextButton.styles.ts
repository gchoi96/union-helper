import { BUTTON_COLOR } from "@/styles/color";
import styled from "@emotion/styled";

export const Button = styled.button<{ color?: string; size?: string }>`
    --font-size: ${({ size }) => size};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size);
    padding: 0.4rem 0.8rem;
    padding: calc(var(--font-size) / 4) calc(var(--font-size) / 2);
    background: ${({ color }) => color ?? BUTTON_COLOR.PRIMARY};
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
`;
