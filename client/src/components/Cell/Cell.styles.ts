import { CELL_STATUS } from "@/core/enums";
import { CELL_COLOR } from "@/styles/color";
import styled from "@emotion/styled";
export const CheckBox = styled.td<{ status: CELL_STATUS; size: number | string }>`
    --size: ${({ size }) => size}px;
    border: 0.05rem solid #888888;
    margin: 0;
    width: var(--size);
    height: var(--size);
    background: ${(props) => {
        switch (props.status) {
            case CELL_STATUS.AVAILABLE:
                return CELL_COLOR.AVAILABLE;
            case CELL_STATUS.UNAVAILABLE:
                return CELL_COLOR.UNAVAILABLE;
            case CELL_STATUS.TO_BE_OCCUPIED:
                return CELL_COLOR.TO_BE_OCCUPIED;
        }
    }};
`;
