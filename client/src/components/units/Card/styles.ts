import styled from "@emotion/styled";
import { flex, border } from "#styles/mixin";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { BACKGROUND_COLOR, BORDER_COLOR, SHADOW_COLOR } from "#constants/colors";
import { CARD_WIDTH, NO_CHAR_IMAGE } from "#constants/strings";
export const Container = styled.div`
    position: relative;
    ${flex({ direction: FLEX_DIRECTION.COLUMN, alignItems: ALIGN_ITEMS.CENTER })}
    background: ${BACKGROUND_COLOR.CHARACTER_CARD};
    ${border("2px", BORDER_COLOR.DARK_ORANGE, "10px")};
    padding: 8px;
    width: ${CARD_WIDTH};
    max-width: 116px;
    max-height: 175px;
    box-shadow: ${`0px 4px 4px ${SHADOW_COLOR.TRANSPARENT}`};
    cursor: pointer;
    :hover {
        transform: translateY(-2%);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
    }
`;

export const Header = styled.div`
    width: 100%;
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.FLEX_START })};
`;

export const Image = styled.div<{ url?: string }>`
    width: 50%;
    height: 90px;
    background: url(${({ url }) => url ?? NO_CHAR_IMAGE}) no-repeat;
    background-size: 200%;
    background-position: -40px -45px;
    margin-bottom: 2px;
`;

export const ButtonWrapper = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
    margin-top: 5px;
    > * {
        margin-left: 5px;
    }
`;

export const UsingIcon = styled.img`
    width: 30px;
    position: absolute;
    left: 84px;
    top: 26px;
`;
