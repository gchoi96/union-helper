import styled from "@emotion/styled";

export const Button = styled.button<{ color: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    padding: 0;
    background: ${({ color }) => color};
    border: none;
    :hover {
        cursor: pointer;
    }
    img {
        width: 80%;
        height: 80%;
    }
`;
