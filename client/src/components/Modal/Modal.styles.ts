import { BACKGROUND_COLOR, BORDER_COLOR, SHADOW_COLOR } from "@/styles/color";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { flex } from "@/styles/mixin";
import styled from "@emotion/styled";

export const ModalContainer = styled.div`
    z-index: 101;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1.5rem 2rem;
    background: ${BACKGROUND_COLOR.MODAL};
    border: 0.1rem solid ${BORDER_COLOR.GRAY};
    border-radius: 10px;
`;

export const ButtonWrapper = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
    width: 100%;
    margin-top: 2rem;
    > :not(:first-child) {
        margin-left: 0.8rem;
    }
`;

export const DimmedLayer = styled.div`
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${SHADOW_COLOR.BLACK};
`;
