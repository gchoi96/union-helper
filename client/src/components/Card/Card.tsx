// TODO: store에서 nickname으로 정보 가져오도록
// export default function Card({ nickname }: { nickname: string }) {

// }
import { CharacterInfo } from "@core/types/CharacterInfo";
import { Avatar, Container, Job, Level, NickName } from "./Card.styles";
interface CardProps {
    characterInfo: CharacterInfo;
    button: React.ComponentType;
}
export default function Card(props: CardProps) {
    const Button = props.button;
    return (
        <Container>
            <div>
                <Level>Lv.{props.characterInfo.level}</Level>
                <Button />
            </div>
            <Avatar src={props.characterInfo.image} />
            <Job>{props.characterInfo.job?.name}</Job>
            <NickName>{props.characterInfo.nickName}</NickName>
        </Container>
    );
}
