import { HTMLAttributes, MouseEventHandler } from "react";
import { Button } from "#components/commons/Button";
import { BUTTON_TYPE } from "#enums/status";
import { DimmedLayer } from "#components/commons/DimmedLayer";
import * as S from "./styles";
export interface Props extends HTMLAttributes<HTMLDivElement> {
    closeModal: () => void;
    onClickSave: () => void;
}

export default function Modal({ children, closeModal, onClickSave }: Props) {
    const onClickModal: MouseEventHandler<HTMLDivElement> = (e) => e.stopPropagation();

    return (
        <DimmedLayer onClick={closeModal}>
            <S.Container onClick={onClickModal}>
                {children}
                <S.ButtonWrapper>
                    <Button onClick={onClickSave}>저장</Button>
                    <Button onClick={closeModal} type={BUTTON_TYPE.RED}>
                        취소
                    </Button>
                </S.ButtonWrapper>
            </S.Container>
        </DimmedLayer>
    );
}
