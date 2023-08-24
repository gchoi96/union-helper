import styled from "@emotion/styled";
import { flex } from "#styles/mixin";
import { FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { BACKGROUND_COLOR, BORDER_COLOR } from "#constants/colors";
export const Container = styled.div`
    ${flex({
        direction: FLEX_DIRECTION.COLUMN,
    })}
    padding: 11.5px 11px;
    border-radius: 10px;
    border: 1px solid ${BORDER_COLOR.GRAY};
    width: fit-content;
    background: ${BACKGROUND_COLOR.GRADIENT_GRAY};
`;

export const BoxWrapper = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
`;

