import AddButton from "@/components/Button/CardButton/AddButton/AddButton";
import TextButton from "@/components/Button/TextButton/TextButton";
import Label from "@/components/Label/Label";
import ControlPanel from "../ControlPanel";

export default function AllListControlPanel() {
    const onClickLoadCharacterList = () => {};

    const onClickAdd = () => {};
    return (
        <ControlPanel title={"캐릭터 목록"}>
            <TextButton onClick={onClickLoadCharacterList} size="1.6rem">캐릭터 목록 불러오기</TextButton>
            <AddButton onClick={onClickAdd} size="2.4rem"/>
            <Label icon="/people_icon.svg" size="2rem">
                42
            </Label>
        </ControlPanel>
    );
}
