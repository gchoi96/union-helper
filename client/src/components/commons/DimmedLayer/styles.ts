import { SHADOW_COLOR } from "#constants/colors";
import styled from "@emotion/styled";

export const DimmedLayer = styled.div`
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${SHADOW_COLOR.BLACK};
`;
