import { Button } from "#components/commons/Button";
import { Txt } from "#components/commons/Txt";
import { SHADOW_COLOR, TEXT_COLOR } from "#constants/colors";
import useCharacterList from "#hooks/useCharacterList";
import useMapleM from "#hooks/useMapleM";
import useModal from "#hooks/useModal";
import { AddCharacterModal } from "#components/units/AddCharacterModal";
import { AddCharactersModal } from "#components/units/AddCharactersModal";
import * as S from "./styles";

export function CardControl() {
    const { getActiveCount, getUnionGrade } = useCharacterList();
    const { mobileLevel, increase, decrease } = useMapleM();
    const addCharactersModal = useModal();
    const addCharacterModal = useModal();
    return (
        <S.Container>
            <div>
                <Txt.GradientTxt gradient={TEXT_COLOR.CONTROL_TITLE} shadow={`0px 2px 2px ${SHADOW_COLOR.BLACK}`}>
                    유니온 캐릭터
                </Txt.GradientTxt>
                <S.Summary>
                    <p>{getActiveCount()}</p>
                    <p>/</p>
                    <p>{getUnionGrade().blockCount}</p>
                </S.Summary>
            </div>
            <S.ControlWrapper>
                <div>
                    <Button onClick={decrease}>{"-"}</Button>
                    <S.MobileTxt>메이플M Lv.{mobileLevel}</S.MobileTxt>
                    <Button onClick={increase}>{"+"}</Button>
                </div>
                <Button onClick={addCharacterModal.openModal}>캐릭터 추가하기</Button>
                <Button onClick={addCharactersModal.openModal}>캐릭터 목록 추가하기</Button>
            </S.ControlWrapper>
            {addCharactersModal.isModalVisible && <AddCharactersModal closeModal={addCharactersModal.closeModal} />}
            {addCharacterModal.isModalVisible && <AddCharacterModal closeModal={addCharacterModal.closeModal} />}
        </S.Container>
    );
}
