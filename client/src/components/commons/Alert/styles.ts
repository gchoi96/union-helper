import { BACKGROUND_COLOR, BORDER_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, FLEX_DIRECTION } from "#enums/flex";
import { flex } from "#styles/mixin";
import styled from "@emotion/styled";

export const Content = styled.div`
    z-index: 101;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 30px;
    background: ${BACKGROUND_COLOR.MODAL};
    border: 1px solid ${BORDER_COLOR.GRAY};
    border-radius: 10px;
    ${flex({ direction: FLEX_DIRECTION.COLUMN, alignItems: ALIGN_ITEMS.CENTER })};
    > p {
        color: white;
    }
`;
