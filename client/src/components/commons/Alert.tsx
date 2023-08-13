import { Button } from "#components/commons/Button";
import { useRecoilState } from "recoil";
import alertState from "#store/alertState";
import { DimmedLayer } from "./DimmedLayer";
import { BACKGROUND_COLOR, BORDER_COLOR } from "#constants/colors";
import { css } from "@emotion/css";
import { Blank } from "#components/commons/Blank";
import { flex } from "#styles/mixin";
import { ALIGN_ITEMS, FLEX_DIRECTION } from "#enums/flex";

export function Alert() {
    const [_alertState, setAlertState] = useRecoilState(alertState);
    return _alertState.visible ? (
        <DimmedLayer>
            <div
                className={css`
                    z-index: 101;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    padding: 20px 30px;
                    background: ${BACKGROUND_COLOR.MODAL};
                    border: 1px solid ${BORDER_COLOR.GRAY};
                    border-radius: 10px;
                    ${flex({ direction: FLEX_DIRECTION.COLUMN, alignItems: ALIGN_ITEMS.CENTER })}
                `}
            >
                <p
                    className={css`
                        color: white;
                    `}
                >
                    {_alertState.message}
                </p>
                <Blank size={20}></Blank>
                <Button onClick={() => setAlertState({ visible: false, message: "" })}>확인</Button>
            </div>
        </DimmedLayer>
    ) : (
        <></>
    );
}
