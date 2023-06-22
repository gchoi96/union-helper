import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { flex, initSize } from "@/styles/mixin";
import styled from "@emotion/styled";

export const Button = styled.button<{ color: string; size?: string }>`
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
    ${({ size }) => initSize(size ?? "2rem", size ?? "2rem")}
    border: none;
    border-radius: 0.5rem;
    padding: 0;
    background: ${({ color }) => color};
    border: none;
    :hover {
        cursor: pointer;
    }
    img {
        width: 80%;
        height: 80%;
    }
`;
