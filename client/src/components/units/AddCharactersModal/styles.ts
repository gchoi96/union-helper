import { BACKGROUND_COLOR, TEXT_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import styled from "@emotion/styled";
import { flex } from "#styles/mixin";
export const Container = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
    width:100%;
    height: 100%;
    textarea {
        width: 100%;
        height: 99%;
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
        margin-left: 10px;
    }
    > img {
        cursor: pointer;
    }
`;

export const Result = styled.div`
    ${flex({ direction: FLEX_DIRECTION.COLUMN, justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
    height: 380px;
`;
