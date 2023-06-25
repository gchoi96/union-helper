import { TEXT_COLOR } from "@/styles/color";
import Box from "../Box/Box";
import { Title } from "../CardControl/CardControl.styles";
import { Container, SubContainer } from "./RaidEffect.styles";
const boxProps = { width: "18rem", height: "22rem" };
export default function RaidEffect() {
    return (
        <Container>
            <Title data-text="공격대 효과" size={"1.3rem"} fontWeight={600} gradient={TEXT_COLOR.CONTROL_TITLE}>
                공격대 효과
            </Title>
            <SubContainer>
                <Box {...boxProps} title="공격대원 효과">
                    {new Array(6).fill("STR 80 증가").map((el, idx) => (
                        <p key={idx}>{el}</p>
                    ))}
                </Box>
                <Box {...boxProps} title="공격대 점령 효과">
                    {new Array(6).fill("STR 80 증가").map((el, idx) => (
                        <p key={idx}>{el}</p>
                    ))}
                </Box>
            </SubContainer>
        </Container>
    );
}
