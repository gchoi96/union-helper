import { BACKGROUND_COLOR, BORDER_COLOR } from "@/styles/color";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { border, flex } from "@/styles/mixin";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
    ${border("0.2rem", BORDER_COLOR.DARK_ORANGE, "1rem")}
    background: ${BACKGROUND_COLOR.BOARD_WRAPPER};
    padding: 1.8rem 4.9rem;
`;
