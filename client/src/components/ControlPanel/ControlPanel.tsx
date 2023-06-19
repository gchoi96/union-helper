import { Container, Content, Title } from "./ControlPanel.styles";

interface ControlPanelProps {
    title: string;
    size?: string;
    children: JSX.Element | JSX.Element[];
}
export default function ControlPanel(props: ControlPanelProps) {
    return (
        <Container>
            <Title size={props.size ?? "2.4rem"}>{props.title}</Title>
            <Content>{props.children}</Content>
        </Container>
    );
}
