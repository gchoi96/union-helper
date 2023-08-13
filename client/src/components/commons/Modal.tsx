import { BACKGROUND_COLOR, BORDER_COLOR, SHADOW_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";
import { flex } from "#styles/mixin";
import { css } from "@emotion/css";
import { HTMLAttributes, MouseEventHandler } from "react";
import { Button } from "#components/commons/Button";
import { BUTTON_TYPE } from "#enums/status";
import { DimmedLayer } from "./DimmedLayer";

export interface Props extends HTMLAttributes<HTMLDivElement> {
    closeModal: () => void;
    onClickSave: () => void;
}

export default function Modal({ children, closeModal, onClickSave }: Props) {
    const onClickModal: MouseEventHandler<HTMLDivElement> = (e) => e.stopPropagation();

    return (
        <DimmedLayer onClick={closeModal}>
            <div
                className={css`
                    z-index: 101;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    padding: 15px 20px;
                    background: ${BACKGROUND_COLOR.MODAL};
                    border: 1px solid ${BORDER_COLOR.GRAY};
                    border-radius: 10px;
                `}
                onClick={onClickModal}
            >
                {children}
                <div
                    className={css`
                        ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
                        width: 100%;
                        margin-top: 20px;
                        > :not(:first-child) {
                            margin-left: 8px;
                        }
                    `}
                >
                    <Button onClick={onClickSave}>저장</Button>
                    <Button onClick={closeModal} type={BUTTON_TYPE.RED}>
                        취소
                    </Button>
                </div>
            </div>
        </DimmedLayer>
    );
}
