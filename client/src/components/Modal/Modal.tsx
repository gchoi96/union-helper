import { BUTTON_COLOR } from "@/core/enums";
import { MouseEventHandler } from "react";
import TextButton from "../TextButton/TextButton";
import { ButtonWrapper, DimmedLayer, ModalContainer } from "./Modal.styles";

export interface ModalProps {
    closeModal: () => void;
    onClickSave: () => void;
    children: JSX.Element | JSX.Element[];
}

export default function Modal({ children, closeModal, onClickSave }: ModalProps) {
    const onClickModalContainer: MouseEventHandler<HTMLDivElement> = (e) => e.stopPropagation();

    return (
        <DimmedLayer onClick={closeModal}>
            <ModalContainer onClick={onClickModalContainer}>
                {children}
                <ButtonWrapper>
                    <TextButton onClick={onClickSave}>저장</TextButton>
                    <TextButton onClick={closeModal} background={BUTTON_COLOR.RED}>
                        취소
                    </TextButton>
                </ButtonWrapper>
            </ModalContainer>
        </DimmedLayer>
    );
}
