import styled from "@emotion/styled";
import { border, flex } from "@/styles/mixin";
import { BACKGROUND_COLOR, BORDER_COLOR } from "@/styles/color";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "@/styles/flexOptions";

export const Container = styled.div`
    width: 100%;
    min-height: 19.2rem;
    ${flex({
        direction: FLEX_DIRECTION.ROW,
        justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
        alignItems: ALIGN_ITEMS.CENTER,
    })}
    ${border("0.1rem", BORDER_COLOR.GRAY, "1rem")}
    background: ${BACKGROUND_COLOR.DARK_GREEN};
    padding: 0.9rem 1.4rem;
    > img {
        cursor: pointer;
    }
`;

export const CardWrapper = styled.div`
    ${flex({ direction: FLEX_DIRECTION.ROW, alignItems: ALIGN_ITEMS.CENTER })}
    > :not(:first-child) {
        margin-left: 0.6rem;
    }
`;
