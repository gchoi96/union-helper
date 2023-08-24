import { Button } from "#components/commons/Button";
import { useRecoilState } from "recoil";
import alertState from "#store/alertState";
import { Blank } from "#components/commons/Blank";
import { DimmedLayer } from "#components/commons/DimmedLayer";
import * as S from "./styles";

export function Alert() {
    const [_alertState, setAlertState] = useRecoilState(alertState);
    return _alertState.visible ? (
        <DimmedLayer>
            <S.Content>
                <p>{_alertState.message}</p>
                <Blank size={20}></Blank>
                <Button onClick={() => setAlertState({ visible: false, message: "" })}>확인</Button>
            </S.Content>
        </DimmedLayer>
    ) : (
        <></>
    );
}
