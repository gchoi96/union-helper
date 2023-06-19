import Board from "@/components/Board/Board";
import CardButtonAdd from "@/components/Button/CardButton/AddButton/AddButton";
import CardButtonDelete from "@/components/Button/CardButton/DeleteButton/DeleteButton";
import Card from "@/components/Card/Card";
import CardList from "@/components/CardList/CardList";
import AllListControlPanel from "@/components/ControlPanel/AllListControlPanel/AllListControlPanel";
import BoardControlPanel from "@/components/ControlPanel/BoardControlPanel/BoardControlPanel";
import SelectedListControlPanel from "@/components/ControlPanel/SelectedListControlPanel/SelectedListControlPanel";
import { JOB, JOB_GROUP } from "@/core/enums";
import { BoardContainer, Body, CardListContainer } from "./index.styles";
import "../app/globals.css";
const allCards = new Array(42).fill(
    <Card
        {...{
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
        }}
    />
);

const selectedCards = new Array(42).fill(
    <Card
        {...{
            characterInfo: {
                nickName: "진부령박스카",
                level: 265,
                job: {
                    group: JOB_GROUP.도적,
                    name: JOB.섀도어,
                },
                image: "https://avatar.maplestory.nexon.com/Character/180/NILJNCMNLEGMPOJMOCEDNJJNCJDHJCKBGHGGLFJDGMGPKEJDNMILMBKLDFCKJFGIEJBGBPHJHMOGHAEFDFENNAOLCDDMEJNHILOGHLKINNGCJPKLDHDEOANHOFNICHMJGCMKCENDJCPEPEDLCOFKOGPPBHDDPLBLEGGAKGOKHEKEPMNIMCLOPEHJFCLCHBNLMONMNELJOJDKKAJFEOLHAPPHCILLPEGHDMEHJGDOMNPEFDEMPKDMMHANIGOIIHID.png",
            },
            button: CardButtonDelete.bind(null, { onClick: () => {} }),
        }}
    />
);

export default function Main() {
    return (
        <Body>
            <CardListContainer>
                <CardList cards={allCards}>
                    <AllListControlPanel />
                </CardList>
                <CardList cards={selectedCards}>
                    <SelectedListControlPanel />
                </CardList>
            </CardListContainer>
            <BoardContainer>
                <BoardControlPanel />
                <Board />
            </BoardContainer>
        </Body>
    );
}
