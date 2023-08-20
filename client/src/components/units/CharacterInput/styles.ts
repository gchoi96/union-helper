import styled from "@emotion/styled";
import { flex } from "#styles/mixin";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";
import { BACKGROUND_COLOR, TEXT_COLOR } from "#constants/colors";
import { css } from "@emotion/css";

const inputStyle = css`

`;

export const Container = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
    width:100%;
`;

export const InputWrapper = styled.div`
        ${flex({ alignItems: ALIGN_ITEMS.CENTER })}
        > :last-child {
            margin-left: 6px;
        }
`;

export const NicknameTxt = styled.p`
    font-size: 10px;
`;

export const LevelInput = styled.input`
    font-size: 10px;
    width: 32px;
    color: ${TEXT_COLOR.WHITE};
    border: none;
    background: ${BACKGROUND_COLOR.INPUT};
    :focus {
        outline: 1px solid gray;
    }
`;

export const JobSelect = styled.select`
    font-size: 10px;
    width: 100px;
    color: ${TEXT_COLOR.WHITE};
    border: none;
    background: ${BACKGROUND_COLOR.INPUT};
    :focus {
        outline: 1px solid gray;
    }
`;
