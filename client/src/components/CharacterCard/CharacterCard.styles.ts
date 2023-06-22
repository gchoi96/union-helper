import { BACKGROUND_COLOR, BORDER_COLOR } from "@/styles/color";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { border, flex } from "@/styles/mixin";
import styled from "@emotion/styled";

export const Container = styled.div`
    ${flex({ direction: FLEX_DIRECTION.COLUMN, alignItems: ALIGN_ITEMS.CENTER })}
    background: ${BACKGROUND_COLOR.CHARACTER_CARD};
    ${border("0.2rem", BORDER_COLOR.DARK_ORANGE, "1rem")};
    padding: 0.8rem;
    max-width: 11.6rem;
    max-height: 17.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const ButtonContainer = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
    margin-top: 0.5rem;
    > * {
        margin-left: 0.5rem;
    }
`;

export const HeaderContainer = styled.div`
    width: 100%;
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.FLEX_START })}
`;

export const CharacterImage = styled.div<{ src: string }>`
    height: 8.5rem;
    width: 100%;
    background: url(${({ src }) => src}) no-repeat;
    background-size: 150%;
    background-position: -22px -46px;
    margin-bottom: 0.2rem;
`;
