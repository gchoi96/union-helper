import AddButton from "@/components/Button/CardButton/AddButton/AddButton";
import TextButton from "@/components/Button/TextButton/TextButton";
import Label from "@/components/Label/Label";
import { BUTTON_COLOR } from "@/styles/color";
import ControlPanel from "../ControlPanel";

export default function SelectedListControlPanel() {
    const onClickLoadCharacterList = () => {};

    const onClickAdd = () => {};
    return (
        <ControlPanel title={"선택 캐릭터 목록"}>
            <TextButton onClick={onClickLoadCharacterList} color={BUTTON_COLOR.DELETE} size="1.6rem">
                초기화
            </TextButton>
            <Label icon="/people_icon.svg" size="2.0rem">
                {`${13}/${42}`}
            </Label>
        </ControlPanel>
    );
}
