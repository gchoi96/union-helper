import { BACKGROUND_COLOR, BORDER_COLOR, SHADOW_COLOR, TEXT_COLOR } from "@/styles/color";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { flex } from "@/styles/mixin";
import styled from "@emotion/styled";

export const Container = styled.div`
    ${flex({
        direction: FLEX_DIRECTION.COLUMN,
        alignItems: ALIGN_ITEMS.CENTER,
        justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
    })}
    border-radius: 1rem;
    border: 1px solid ${BORDER_COLOR.GRAY};
    background: ${BACKGROUND_COLOR.GRADIENT_GRAY};
    padding: 2rem 3rem;
    width: 39rem;
    height: 43.2rem;
`;

export const GradeLabel = styled.p`
    color: ${TEXT_COLOR.WHITE};
    text-align: center;
    text-shadow: 0 0 0.6rem ${SHADOW_COLOR.UNION_GRADE};
    font-size: 3rem;
    font-weight: 700;
`;

export const CountLabel = styled.p<{ size: string }>``;

export const CountWrapper = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })}
    width:100%;
`;

export const ButtonWrapper = styled.div`
    > div {
        ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
        margin-top: 2.7rem;
        > :not(:first-child) {
            margin-left: 2.7rem;
        }
    }
`;
