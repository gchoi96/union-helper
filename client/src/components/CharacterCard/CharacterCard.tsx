import { CharacterInfo } from "@/core/types/CharacterInfo";
import { getGradeFromCharacterLevel } from "@/core/utils";
import { TEXT_COLOR } from "@/styles/color";
import CardButtonAdd from "../CardButton/CardButtonAdd/CardButtonAdd";
import CardButtonDelete from "../CardButton/CardButtonDelete/CardButtonDelete";
import CardButtonRefresh from "../CardButton/CardButtonRefresh/CardButtonRefresh";
import Label from "../Label/Label";
import { ButtonContainer, CharacterImage, Container, HeaderContainer } from "./CharacterCard.styles";

interface CharacterCardProps {
    characterInfo: CharacterInfo;
}

// TODO: props로는 character.nickname만 받고, store에서 캐릭터 정보 불러오도록 수정
export default function CharacterCard({ characterInfo }: CharacterCardProps) {
    return (
        <Container>
            <HeaderContainer>
                <Label
                    size={"2.8rem"}
                    fontWeight={600}
                    color={TEXT_COLOR.CARD_GRADE}
                    border={{ weight: "0.2rem", color: TEXT_COLOR.BLACK }}
                >
                    {getGradeFromCharacterLevel(characterInfo.level)}
                </Label>
                <Label size={"1.2rem"} fontWeight={600} color={TEXT_COLOR.GRAY}>{`Lv.${characterInfo.level}`}</Label>
            </HeaderContainer>
            <CharacterImage src={characterInfo.image} />
            <Label size={"1.2rem"} fontWeight={500} color={TEXT_COLOR.GRAY}>
                {characterInfo.job?.name ?? "???"}
            </Label>
            <Label size={"1rem"} fontWeight={600} color={TEXT_COLOR.GOLD}>
                {characterInfo.nickName}
            </Label>
            <ButtonContainer>
                <CardButtonAdd onClick={() => {}} />
                <CardButtonDelete onClick={() => {}} />
                <CardButtonRefresh onClick={() => {}} />
            </ButtonContainer>
        </Container>
    );
}
