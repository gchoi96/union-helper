import { TEXT_COLOR } from "@/styles/color";
import styled from "@emotion/styled";
import { flex } from "@/styles/mixin";
import { ALIGN_ITEMS, FLEX_DIRECTION } from "@/styles/flexOptions";
const Label = styled.p`
    font-weight: 700;
    letter-spacing: -0.07em;
    background: ${TEXT_COLOR.COUNTER};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

export const Container = styled.div`
    ${flex({ direction: FLEX_DIRECTION.COLUMN, alignItems: ALIGN_ITEMS.CENTER })}
    > :not(:first-child) {
        margin-top: 0.3rem;
    }
`;

export const Title = styled(Label)`
    font-size: 1.4rem;
`;

export const Content = styled(Label)`
    font-size: 4rem;
    padding: 0 1rem;
`;
