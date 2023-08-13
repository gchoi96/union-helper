import alertState from "#store/alertState";
import { useSetRecoilState } from "recoil";

export function useAlert() {
    const setAlertState = useSetRecoilState(alertState);
    const alert = (message: string) => {
        setAlertState({ visible: true, message });
    };

    return alert;
}
