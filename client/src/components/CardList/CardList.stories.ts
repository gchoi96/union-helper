import { JOB, JOB_GROUP } from "@/core/enums";
import { Meta, StoryObj } from "@storybook/react";
import CardList from "./CardList";

export default {
    component: CardList,
    title: "CharacterCard/CardList",
} as Meta<typeof CardList>;

const characterInfo = {
    nickname: "진부령박스카",
    level: 265,
    job: {
        group: JOB_GROUP.도적,
        name: JOB.섀도어,
    },
    image: "https://avatar.maplestory.nexon.com/Character/180/NILJNCMNLEGMPOJMOCEDNJJNCJDHJCKBGHGGLFJDGMGPKEJDNMILMBKLDFCKJFGIEJBGBPHJHMOGHAEFDFENNAOLCDDMEJNHILOGHLKINNGCJPKLDHDEOANHOFNICHMJGCMKCENDJCPEPEDLCOFKOGPPBHDDPLBLEGGAKGOKHEKEPMNIMCLOPEHJFCLCHBNLMONMNELJOJDKKAJFEOLHAPPHCILLPEGHDMEHJGDOMNPEFDEMPKDMMHANIGOIIHID.png",
};

export const _CardList: StoryObj<typeof CardList> = {
    args: {
        characters: new Array(10).fill({ ...characterInfo }),
    },
};
