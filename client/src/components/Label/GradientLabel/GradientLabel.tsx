import { LabelProps } from "../Label";
import { GradientP } from "./GradientLabel.styles";

export interface GradientLabelProps extends Omit<LabelProps, "color"> {
    gradient: string;
}

export default function GradientLabel({ size, border, fontWeight, gradient, children }: GradientLabelProps) {
    return (
        <GradientP data-text={typeof children === "string" ? children : ""} size={size} border={border} fontWeight={fontWeight} gradient={gradient}>
            {children}
        </GradientP>
    );
}
