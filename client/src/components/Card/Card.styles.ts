import { BLACK, CARD_COLOR, TEXT_COLOR } from "@/styles/color";
import styled from "@emotion/styled";

export const Container = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 15rem;
    border-radius: 2rem;
    background: ${CARD_COLOR.DARK};
    border: 0.25rem solid #f1ddbf;
    > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    > img {
        max-height: 9rem;
        object-fit: cover;
    }
`;

export const Avatar = styled.div<{ src: string }>`
    height: 9rem;
    width: 100%;
    background: url(${({ src }) => src}) no-repeat;
    background-position: -25px -51px;
    margin-bottom: 1rem;
`;

export const Level = styled.p`
    font-weight: 700;
    font-size: 1.3rem;
    text-align: center;
    color: ${TEXT_COLOR.GOLD};
    /* border: 0.1rem solid ${BLACK}; */
`;

export const Job = styled.span`
    font-weight: 600;
    font-size: 1.3px;
    text-align: center;
    color: ${TEXT_COLOR.GRAY};
    margin-bottom: 0.5rem;
`;

export const NickName = styled.span`
    font-size: 1.6rem;
    text-align: center;
    color: ${TEXT_COLOR.WHITE};
`;
