import { JOB, JOB_GROUP } from "@/core/enums";
import { Meta, StoryObj } from "@storybook/react";
import CardButtonAdd from "../Button/CardButton/AddButton/AddButton";
import Card from "./Card";

export default {
    title: "Card",
    component: Card,
    args: {
        characterInfo: {
            nickName: "진부령박스카",
            level: 265,
            job: {
                group: JOB_GROUP.도적,
                name: JOB.섀도어,
            },
            image: "https://avatar.maplestory.nexon.com/Character/180/NILJNCMNLEGMPOJMOCEDNJJNCJDHJCKBGHGGLFJDGMGPKEJDNMILMBKLDFCKJFGIEJBGBPHJHMOGHAEFDFENNAOLCDDMEJNHILOGHLKINNGCJPKLDHDEOANHOFNICHMJGCMKCENDJCPEPEDLCOFKOGPPBHDDPLBLEGGAKGOKHEKEPMNIMCLOPEHJFCLCHBNLMONMNELJOJDKKAJFEOLHAPPHCILLPEGHDMEHJGDOMNPEFDEMPKDMMHANIGOIIHID.png",
        },
        button: CardButtonAdd
    },
} as Meta<typeof Card>;

export const _Card: StoryObj<typeof Card> = {};
