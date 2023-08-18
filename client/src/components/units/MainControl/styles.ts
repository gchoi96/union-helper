import styled from "@emotion/styled";
import { flex } from "#styles/mixin";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { BACKGROUND_COLOR, BORDER_COLOR, SHADOW_COLOR, TEXT_COLOR } from "#constants/colors";

export const Container = styled.div`
    ${flex({
        direction: FLEX_DIRECTION.COLUMN,
        alignItems: ALIGN_ITEMS.CENTER,
        justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
    })}
    border-radius: 10px;
    border: 1px solid ${BORDER_COLOR.GRAY};
    background: ${BACKGROUND_COLOR.GRADIENT_GRAY};
    padding: 20px 30px;
    width: 390px;
    height: 432px;
`;

export const GradeTxt = styled.p`
    color: ${TEXT_COLOR.WHITE};
    text-align: center;
    text-shadow: 0 0 6px ${SHADOW_COLOR.UNION_GRADE};
    font-size: 30px;
    font-weight: 700;
`;

export const CounterWrapper = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })}
    width:100%;
    > * {
        width: 40%;
    }
`;

export const ButtonWrapper = styled.div`
                      > div {
                        ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })};
                        margin-top: 27px;
                        > :not(:first-child) {
                            margin-left: 27px;
                        }
                    }
`