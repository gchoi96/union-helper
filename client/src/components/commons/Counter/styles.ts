import styled from "@emotion/styled";
import { flex } from "#styles/mixin";
import { ALIGN_ITEMS, FLEX_DIRECTION } from "#enums/flex";
import { TEXT_COLOR } from "#constants/colors";
export const Container = styled.div`
    ${flex({ direction: FLEX_DIRECTION.COLUMN, alignItems: ALIGN_ITEMS.CENTER })};
    > :not(:first-child) {
        margin-top: 3px;
    }
    > p {
        font-weight: 700;
        letter-spacing: -0.7px;
        background: ${TEXT_COLOR.COUNTER};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
`;

export const Title = styled.p`
    font-size: 14px;
`;

export const Content = styled.p`
    font-size: 40px;
    padding: 0 1px;
`;
