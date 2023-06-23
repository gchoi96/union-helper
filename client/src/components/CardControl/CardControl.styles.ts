import { BACKGROUND_COLOR, SHADOW_COLOR, TEXT_COLOR } from "@/styles/color";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { flex } from "@/styles/mixin";
import styled from "@emotion/styled";
import { GradientP } from "../Label/GradientLabel/GradientLabel.styles";

export const Title = styled(GradientP)`
    position: relative;
    :before {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        text-shadow: 0rem 0.2rem 0.2rem ${SHADOW_COLOR.BLACK};
    }
`;

export const Container = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
    width:100%;
`;

export const SubContainer = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
    > :last-child {
        margin-left: 0.6rem;
    }
`;

export const CharacterCountWrapper = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
    padding: 0.25rem 1.85rem;
    background: ${BACKGROUND_COLOR.COUNTER};
    box-shadow: inset 0 0 0.4rem ${SHADOW_COLOR.CHARACTER_COUNTER};
    border-radius: 1rem;
    > p {
        font-weight: 600;
        font-size: 1.1rem;
    }

    > :first-child {
        color: ${TEXT_COLOR.WHITE};
    }

    > :not(:first-child) {
        color: ${TEXT_COLOR.LIGHT_GRAY};
        margin-left: 0.2rem;
    }
`;
