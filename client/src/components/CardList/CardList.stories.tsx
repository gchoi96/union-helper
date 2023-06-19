import { JOB, JOB_GROUP } from "@/core/enums";
import { Meta, StoryObj } from "@storybook/react";
import CardButtonAdd from "../Button/CardButton/AddButton/AddButton";
import Card from "../Card/Card";
import SelectedListControlPanel from "../ControlPanel/SelectedListControlPanel/SelectedListControlPanel";
import CardList from "./CardList";

export default {
    title: "CardList",
    component: CardList,
} as Meta<typeof CardList>;

const cardProps = {
    characterInfo: {
        nickName: "진부령박스카",
        level: 265,
        job: {
            group: JOB_GROUP.도적,
            name: JOB.섀도어,
        },
        image: "https://avatar.maplestory.nexon.com/Character/180/NILJNCMNLEGMPOJMOCEDNJJNCJDHJCKBGHGGLFJDGMGPKEJDNMILMBKLDFCKJFGIEJBGBPHJHMOGHAEFDFENNAOLCDDMEJNHILOGHLKINNGCJPKLDHDEOANHOFNICHMJGCMKCENDJCPEPEDLCOFKOGPPBHDDPLBLEGGAKGOKHEKEPMNIMCLOPEHJFCLCHBNLMONMNELJOJDKKAJFEOLHAPPHCILLPEGHDMEHJGDOMNPEFDEMPKDMMHANIGOIIHID.png",
    },
    button: CardButtonAdd.bind(null, { onClick: () => {} }),
};

export const _CardList: StoryObj<typeof CardList> = {
    args: {
        children: <SelectedListControlPanel></SelectedListControlPanel>,
        cards: new Array(12).fill(<Card {...cardProps} />),
    },
};
