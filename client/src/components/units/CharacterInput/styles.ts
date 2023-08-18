import styled from "@emotion/styled";
import { flex } from "#styles/mixin";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";
import { BACKGROUND_COLOR, TEXT_COLOR } from "#constants/colors";
import { css } from "@emotion/css";

const inputStyle = css`
    color: ${TEXT_COLOR.WHITE};
    border: none;
    background: ${BACKGROUND_COLOR.INPUT};
    padding: 1px 2px;
    :focus {
        outline: 1px solid gray;
    }
`;

export const Container = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
    width:100%;
`;

export const InputWrapper = styled.div`
    > :first-child {
        ${flex({ alignItems: ALIGN_ITEMS.CENTER })}
        text-align: center;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.2px;
        > p {
            font-size: 12px;
        }
        > :last-child {
            margin-left: 6px;
        }
    }
`;

export const NicknameTxt = styled.p`
    font-size: 12px;
`;

export const LevelInput = styled.input`
    font-size: 16px;
    width: 32px;
    ${inputStyle}
`;

export const JobSelect = styled.select`
    font-size: 10px;
    width: 100px;
    ${inputStyle}
`;
