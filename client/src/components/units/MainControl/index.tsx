import { Button } from "#components/commons/Button";
import { Counter } from "#components/commons/Counter";
import { BUTTON_TYPE } from "#enums/status";
import { useAlert } from "#hooks/useAlert";
import useBoard from "#hooks/useBoard";
import useCharacterList from "#hooks/useCharacterList";
import * as S from "./styles";
export function MainControl() {
    const { getTotalLevel, getOccupiableSize, getUnionGrade, autoSelect } = useCharacterList();
    const { getSelectedCount, reset: resetBoard, simulate } = useBoard();
    const alert = useAlert();

    const onClickExec = async () => {
        autoSelect();
        simulate();
    };

    return (
        <S.Container>
            <S.GradeTxt>{getUnionGrade().text}</S.GradeTxt>
            <S.CounterWrapper>
                <Counter>
                    <Counter.Title>점령 가능 지역</Counter.Title>
                    <Counter.Content>
                        {getSelectedCount()}/{getOccupiableSize()}
                    </Counter.Content>
                </Counter>
                <Counter>
                    <Counter.Title>TOTAL LEVEL</Counter.Title>
                    <Counter.Content>{String(getTotalLevel())}</Counter.Content>
                </Counter>
            </S.CounterWrapper>
            <S.ButtonWrapper>
                <Button
                    size="large"
                    onClick={() => {
                        alert("오류가 있어 수정 중입니다.");
                    }}
                >
                    점령지역 자동선택
                </Button>
                <div>
                    <Button size="large" type={BUTTON_TYPE.RED} onClick={resetBoard}>
                        초기화
                    </Button>
                    <Button size="large" type={BUTTON_TYPE.GREEN} onClick={onClickExec}>
                        실행
                    </Button>
                </div>
            </S.ButtonWrapper>
        </S.Container>
    );
}
