import styled from "@emotion/styled";
import { flex } from "#styles/mixin";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
export const Container = styled.div`
    ${flex({
        direction: FLEX_DIRECTION.COLUMN,
        justifyContent: JUSTIFY_CONTENT.FLEX_START,
        alignItems: ALIGN_ITEMS.FLEX_START,
    })};
    > select {
      width: 100%;
    }
`;
