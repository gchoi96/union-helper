import TextButton from "@/components/Button/TextButton/TextButton";
import Label from "@/components/Label/Label";
import ControlPanel from "../ControlPanel";

export default function BoardControlPanel() {
    return (
        <ControlPanel title={"노비스 유니온 I"} size={"4.8rem"}>
            <TextButton onClick={() => {}} size={"2.4rem"}>
                점령 지역 자동 선택
            </TextButton>
            <Label size={"2.4rem"} >
                111/222
            </Label>
        </ControlPanel>
    );
}
