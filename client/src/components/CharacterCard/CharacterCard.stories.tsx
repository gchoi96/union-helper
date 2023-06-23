import { JOB, JOB_GROUP } from "@/core/enums";
import { Meta, StoryObj } from "@storybook/react";
import CharacterCard from "./CharacterCard";

export default {
    title: "CharacterCard/Card",
    component: CharacterCard,
} as Meta<typeof CharacterCard>;

const characterInfo = {
    nickname: "진부령박스카",
    level: 265,
    job: {
        group: JOB_GROUP.도적,
        name: JOB.섀도어,
    },
    image: "https://avatar.maplestory.nexon.com/Character/180/NILJNCMNLEGMPOJMOCEDNJJNCJDHJCKBGHGGLFJDGMGPKEJDNMILMBKLDFCKJFGIEJBGBPHJHMOGHAEFDFENNAOLCDDMEJNHILOGHLKINNGCJPKLDHDEOANHOFNICHMJGCMKCENDJCPEPEDLCOFKOGPPBHDDPLBLEGGAKGOKHEKEPMNIMCLOPEHJFCLCHBNLMONMNELJOJDKKAJFEOLHAPPHCILLPEGHDMEHJGDOMNPEFDEMPKDMMHANIGOIIHID.png",
};

export const _Card: StoryObj<typeof CharacterCard> = {
    args: {
        characterInfo,
    },
};
