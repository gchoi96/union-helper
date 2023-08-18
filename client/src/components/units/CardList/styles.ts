import styled from "@emotion/styled";
import { flex, border } from "#styles/mixin";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { BACKGROUND_COLOR, BORDER_COLOR } from "#constants/colors";
export const Container = styled.div`
    width: 100%;
    height: 192px;
    ${flex({
        direction: FLEX_DIRECTION.ROW,
        justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
        alignItems: ALIGN_ITEMS.CENTER,
    })}
    ${border("1px", BORDER_COLOR.GRAY, "10px")};
    background: ${BACKGROUND_COLOR.DARK_GREEN};
    padding: 9px 14px;
    > img {
        cursor: pointer;
    }
`;

export const Dummy = styled.div`
    width: 116px;
`;

export const Page = styled.div`
    ${flex({ direction: FLEX_DIRECTION.ROW, alignItems: ALIGN_ITEMS.CENTER })}
    > :not(:first-child) {
        margin-left: 6px;
    }
`;
