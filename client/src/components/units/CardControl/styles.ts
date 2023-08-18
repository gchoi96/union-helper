import styled from "@emotion/styled";
import { flex } from "#styles/mixin";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";
import { BACKGROUND_COLOR, SHADOW_COLOR, TEXT_COLOR } from "#constants/colors";
export const Container = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
    width:100%;
    > div {
        ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
        > :not(:first-child) {
            margin-left: 6px;
        }
    }
`;

export const Summary = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
    padding: 2.5px;
    background: ${BACKGROUND_COLOR.COUNTER};
    box-shadow: inset 0 0 40px ${SHADOW_COLOR.CHARACTER_COUNTER};
    border-radius: 10px;
    color: ${TEXT_COLOR.WHITE};
    width: 60px;
    > p {
        font-weight: 600;
        font-size: 11px;
    }
    > :not(:first-child) {
        color: ${TEXT_COLOR.LIGHT_GRAY};
        margin-left: 2px;
    }
`;

export const ControlWrapper = styled.div`
    > div {
        ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
        color: ${TEXT_COLOR.WHITE};
        font-size: 12px;
        > :not(:first-child) {
            margin-left: 6px;
        }
    }
`;

export const MobileTxt = styled.div`
                              width: 80px;
                            text-align: center;
`
