import { Icon, Text, Wrapper } from "./Label.styles";

interface LabelProps {
    icon?: string;
    size?: string;
    children: string;
}
export default function Label(props: LabelProps) {
    const size = props.size ?? "1.3rem";
    return (
        <Wrapper>
            {props.icon && <Icon src={props.icon} size={size} />}
            <Text size={size}>{props.children}</Text>
        </Wrapper>
    );
}
