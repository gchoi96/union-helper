import { BACKGROUND_COLOR, TEXT_COLOR } from "@/styles/color";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "@/styles/flexOptions";
import { flex } from "@/styles/mixin";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const inputStyle = css`
    color: ${TEXT_COLOR.WHITE};
    border: none;
    background: ${BACKGROUND_COLOR.INPUT};
    padding: 0.1rem 0.2rem;
    :focus {
        outline: 1px solid gray;
    }
`;

export const Container = styled.div`
    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
    width:100%;
    > :first-child {
        ${flex({ alignItems: ALIGN_ITEMS.CENTER })}
        text-align: center;
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 0.2px;
        > p {
            font-size: 1.2rem;
        }
        > :last-child {
            margin-left: 0.6rem;
        }
    }
`;

export const LevelInput = styled.input`
    font-size: 1rem;
    width: 2rem;

    ${inputStyle}
`;

export const JobSelect = styled.select`
    width: 10rem;
    font-size: 1rem;
    ${inputStyle}
`;
