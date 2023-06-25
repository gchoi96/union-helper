import { BACKGROUND_COLOR, BORDER_COLOR } from "@/styles/color";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { flex, border } from "@/styles/mixin";
import styled from "@emotion/styled";

export const Table = styled.div<{ width: string; height: string }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;

export const Container = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
    ${border("0.2rem", BORDER_COLOR.DARK_ORANGE, "1rem")}
    background: ${BACKGROUND_COLOR.DARK_GREEN};
    padding: 1.6rem 4.7rem;
`;
