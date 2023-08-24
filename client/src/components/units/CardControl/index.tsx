import { Txt } from "#components/commons/Txt";
import { SHADOW_COLOR, TEXT_COLOR } from "#constants/colors";
import useCharacterList from "#hooks/useCharacterList";
import useMapleM from "#hooks/useMapleM";
import useModal from "#hooks/useModal";
import { AddCharacterModal } from "#components/units/AddCharacterModal";
import { AddCharactersModal } from "#components/units/AddCharactersModal";
import * as S from "./styles";
import { BUTTON_TYPE } from "#enums/status";

export function CardControl() {
    const { mobileLevel, increase, decrease } = useMapleM();
    const addCharactersModal = useModal();
    const addCharacterModal = useModal();
    const { getActiveCount, getUnionGrade, reset } = useCharacterList();
    return (
        <S.Container>
            <div>
                <Txt.GradientTxt weight={700} gradient={TEXT_COLOR.CONTROL_TITLE} shadow={`0px 2px 2px ${SHADOW_COLOR.BLACK}`}>
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
                    <S.Button onClick={decrease}>{"-"}</S.Button>
                    <S.MobileTxt>메이플M Lv.{mobileLevel}</S.MobileTxt>
                    <S.Button onClick={increase}>{"+"}</S.Button>
                </div>
                <S.Button onClick={addCharacterModal.openModal}>캐릭터 추가</S.Button>
                <S.Button onClick={addCharactersModal.openModal}>캐릭터 목록 추가</S.Button>
                <S.Button onClick={reset} type={BUTTON_TYPE.RED}>
                    <img src="/icons/trash_icon.svg" alt="trash_icon" />
                </S.Button>
            </S.ControlWrapper>
            {addCharactersModal.isModalVisible && <AddCharactersModal closeModal={addCharactersModal.closeModal} />}
            {addCharacterModal.isModalVisible && <AddCharacterModal closeModal={addCharacterModal.closeModal} />}
        </S.Container>
    );
}
