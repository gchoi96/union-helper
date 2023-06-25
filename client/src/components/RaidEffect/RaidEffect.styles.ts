import { JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { ContainerStyle, flex } from "@/styles/mixin";
import styled from "@emotion/styled";
import { BACKGROUND_COLOR, SHADOW_COLOR } from "@/styles/color";
import { GradientP } from "../Label/GradientLabel/GradientLabel.styles";

export const Container = styled.div`
    ${ContainerStyle}
    width: fit-content;
    background: ${BACKGROUND_COLOR.GRADIENT_GRAY};
`;

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

export const SubContainer = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })}
    margin-top: 0.7rem;
    > :not(:first-child) {
        margin-left: 0.6rem;
    }
`;
