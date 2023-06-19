import styled from "@emotion/styled";

interface Size {
    size: string;
}

export const Icon = styled.img<Size>`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    margin-right: 0.5rem;
`;
export const Text = styled.p<Size>`
    font-size: ${({ size }) => size};
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;
