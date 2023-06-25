import styled from "@emotion/styled";
import { flex } from "@/styles/mixin";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { BACKGROUND_COLOR, TEXT_COLOR } from "@/styles/color";

export const Container = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
    width:100%;
    height: 100%;
    textarea {
        width: 100%;
        height: 100%;
        resize: none;
        background: none;
        border: none;
        color: ${TEXT_COLOR.BOX_CONTENT};
        :focus {
            outline: none;
        }
        ::-webkit-scrollbar {
            background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background-color: ${BACKGROUND_COLOR.COUNTER};
        }
    }
    > :not(:first-child) {
        margin-left: 1rem;
    }
    > img {
        cursor: pointer;
    }
`;

export const SubContainer = styled.div`
    ${flex({ direction: FLEX_DIRECTION.COLUMN, justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })}
    height: 38rem
`;
