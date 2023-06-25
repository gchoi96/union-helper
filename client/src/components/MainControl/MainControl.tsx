import { BUTTON_COLOR } from "@/core/enums";
import CounterLabel from "../Label/CounterLabel/CounterLabel";
import TextButton from "../TextButton/TextButton";
import { ButtonWrapper, Container, CountWrapper, GradeLabel } from "./MainControl.styles";

export default function MainControl() {
    return (
        <Container>
            <GradeLabel>마스터 유니온 VI</GradeLabel>
            <CountWrapper>
                <CounterLabel title={"점령 가능 지역"}>{`111 / 111`}</CounterLabel>
                <CounterLabel title={"TOTAL LEVEL"}>7076</CounterLabel>
            </CountWrapper>
            <ButtonWrapper>
                <TextButton size="large" onClick={() => {}}>
                    점령지역 자동선택
                </TextButton>
                <div>
                    <TextButton size="large" background={BUTTON_COLOR.RED} onClick={() => {}}>
                        초기화
                    </TextButton>
                    <TextButton size="large" background={BUTTON_COLOR.GREEN} onClick={() => {}}>
                        실행
                    </TextButton>
                </div>
            </ButtonWrapper>
        </Container>
    );
}
