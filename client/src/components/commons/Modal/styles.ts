import { BACKGROUND_COLOR, BORDER_COLOR } from "#constants/colors";
import styled from "@emotion/styled";
import { flex } from "#styles/mixin";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";

export const Container = styled.div`
    z-index: 101;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 20px;
    background: ${BACKGROUND_COLOR.MODAL};
    border: 1px solid ${BORDER_COLOR.GRAY};
    border-radius: 10px;
`;

export const ButtonWrapper = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
    width: 100%;
    margin-top: 20px;
    > :not(:first-child) {
        margin-left: 8px;
    }
`;
