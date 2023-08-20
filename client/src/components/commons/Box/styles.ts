import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import styled from "@emotion/styled";
import { flex, textBorder } from "#styles/mixin";
import { BACKGROUND_COLOR, BORDER_COLOR, TEXT_COLOR } from "#constants/colors";
import { Border } from "#types/border";
interface ContainerProps {
    width: string;
    height: string;
}
export const Container = styled.div<ContainerProps>`
    ${flex({
        direction: FLEX_DIRECTION.COLUMN,
    })};
    padding: 11.5px 11px;
    border-radius: 10px;
    border: 1px solid ${BORDER_COLOR.GRAY};
    background: ${BACKGROUND_COLOR.DARK_GREEN};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    text-align: center;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2px;
    color: ${TEXT_COLOR.BOX_CONTENT};
`;

export const Label = styled.p<{ border?: Border }>`
    ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })};
    ${({ border }) => border && textBorder(border.weight, border.color)}
    margin-bottom: 12px;
    font-size: 13px;
    font-weight: 400;
    color: ${TEXT_COLOR.WHITE};
`;

export const Content = styled.div`
    ${flex({ direction: FLEX_DIRECTION.COLUMN })}
    width: 100%;
    height: 100%;
    overflow: auto;
    ::-webkit-scrollbar {
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${BACKGROUND_COLOR.COUNTER};
        border-radius: 10px;
    }
`;
