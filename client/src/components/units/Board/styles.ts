import styled from "@emotion/styled";
import { flex, border, initSize } from "#styles/mixin";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { BACKGROUND_COLOR, BORDER_COLOR } from "#constants/colors";
import { NO_CHAR_IMAGE } from "#constants/strings";

interface TooltipImageProps {
    url?: string;
}

export const Container = styled.div`
    ${flex({
        direction: FLEX_DIRECTION.COLUMN,
        justifyContent: JUSTIFY_CONTENT.CENTER,
        alignItems: ALIGN_ITEMS.CENTER,
    })};
    ${border("2px", BORDER_COLOR.DARK_ORANGE, "10px")};
    background: ${BACKGROUND_COLOR.DARK_GREEN};
    color: red;
    padding: 16px 47px;
`;

export const Board = styled.div`
    ${initSize("484px", "440px")};
`;

export const Tooltip = {
    Container: styled.div`
        ${flex({
            direction: FLEX_DIRECTION.ROW,
            justifyContent: JUSTIFY_CONTENT.CENTER,
            alignItems: ALIGN_ITEMS.CENTER,
        })};
        width: 150px;
    `,
    Image: styled.div<TooltipImageProps>`
        width: 50%;
        height: 90px;
        background: url(${({ url }) => url || NO_CHAR_IMAGE}) no-repeat;
        background-size: 200%;
        background-position: -40px -45px;
        margin-bottom: 2px;
    `,
    TextWrapper: styled.div`
        width: 50%;
        ${flex({
            direction: FLEX_DIRECTION.COLUMN,
            justifyContent: JUSTIFY_CONTENT.CENTER,
            alignItems: ALIGN_ITEMS.CENTER,
        })}
        > p {
            width: 100%;
        }
    `,
};
