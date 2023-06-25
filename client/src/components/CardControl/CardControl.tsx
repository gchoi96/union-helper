import useModal from "@/hooks/useModal";
import { TEXT_COLOR } from "@/styles/color";
import LoadCharactersModal from "../Modal/LoadCharactersModal/LoadCharactersModal";
import TextButton from "../TextButton/TextButton";
import { CharacterCountWrapper, Container, SubContainer, Title } from "./CardControl.styles";

export default function CardControl() {
    const loadModal = useModal();
    const onClickAdd = () => {};
    const onClickLoad = () => {};

    return (
        <Container>
            <SubContainer>
                <Title data-text="유니온 캐릭터" size={"1.3rem"} fontWeight={600} gradient={TEXT_COLOR.CONTROL_TITLE}>
                    유니온 캐릭터
                </Title>
                <CharacterCountWrapper>
                    <p>1</p>
                    <p>/</p>
                    <p>42</p>
                </CharacterCountWrapper>
            </SubContainer>
            <SubContainer>
                <TextButton onClick={onClickAdd}>캐릭터 추가하기</TextButton>
                <TextButton onClick={loadModal.openModal}>캐릭터 목록 불러오기</TextButton>
            </SubContainer>
            {loadModal.isModalVisible && (
                <LoadCharactersModal closeModal={loadModal.closeModal} onClickSave={() => {}} />
            )}
        </Container>
    );
}
