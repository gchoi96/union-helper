import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background: #5e5d5d;
    border-radius: 2rem;
    max-width: 100%;
    max-height: 47.5%;
`;

export const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    overflow-x: hidden;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
    > div {
        margin-bottom: 0.5rem;
    }
`;
