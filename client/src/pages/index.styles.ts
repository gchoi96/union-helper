import styled from "@emotion/styled";
import { flex } from "@/styles/mixin";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "@/styles/flexOptions";
export const Container = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
    padding: 1.2rem 2rem;
    width: 1028px;
    height: 740px;
    flex-shrink: 0;
    border-radius: 5px;
    border: 5px solid #fff;
    background: #464643;
    > div {
        ${flex({
            direction: FLEX_DIRECTION.COLUMN,
            justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
            alignItems: ALIGN_ITEMS.CENTER,
        })}
        height: 100%;
    }
`;
