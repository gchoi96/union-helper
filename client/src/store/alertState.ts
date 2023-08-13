import { atom } from "recoil";

const alertState = atom<{ visible: boolean; message: string }>({
    key: "alertState",
    default: { visible: false, message: "" },
});

export default alertState;
