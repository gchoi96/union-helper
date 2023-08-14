import { Button } from "#components/commons/Button";
import { Txt } from "#components/commons/Txt";
import { BACKGROUND_COLOR, SHADOW_COLOR, TEXT_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";
import useCharacterList from "#hooks/useCharacterList";
import useMapleM from "#hooks/useMapleM";
import useModal from "#hooks/useModal";
import { flex } from "#styles/mixin";
import { css } from "@emotion/css";
import { AddCharacterModal } from "./AddCharacterModal";
import { AddCharactersModal } from "./AddCharactersModal";

export function CardControl() {
    const { getActiveCount, getUnionGrade } = useCharacterList();
    const { mobileLevel, increase, decrease } = useMapleM();
    const addCharactersModal = useModal();
    const addCharacterModal = useModal();
    return (
        <div
            className={css`
                ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
                width:100%;
                > div {
                    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
                    > :not(:first-child) {
                        margin-left: 6px;
                    }
                }
            `}
        >
            <div>
                <Txt.GradientTxt gradient={TEXT_COLOR.CONTROL_TITLE} shadow={`0px 2px 2px ${SHADOW_COLOR.BLACK}`}>
                    유니온 캐릭터
                </Txt.GradientTxt>
                <div
                    className={css`
                        ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
                        padding: 2.5px;
                        background: ${BACKGROUND_COLOR.COUNTER};
                        box-shadow: inset 0 0 40px ${SHADOW_COLOR.CHARACTER_COUNTER};
                        border-radius: 10px;
                        color: ${TEXT_COLOR.WHITE};
                        width: 60px;
                        > p {
                            font-weight: 600;
                            font-size: 11px;
                        }
                        > :not(:first-child) {
                            color: ${TEXT_COLOR.LIGHT_GRAY};
                            margin-left: 2px;
                        }
                    `}
                >
                    <p>{getActiveCount()}</p>
                    <p>/</p>
                    <p>{getUnionGrade().blockCount}</p>
                </div>
            </div>
            <div
                className={css`
                    > div {
                        ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
                        color: ${TEXT_COLOR.WHITE};
                        font-size: 12px;
                        > :not(:first-child) {
                            margin-left: 6px;
                        }
                    }
                `}
            >
                <div>
                    <Button
                        styles={css`
                            padding: 2px 6px;
                            width: 20px;
                        `}
                        onClick={decrease}
                    >
                        {"-"}
                    </Button>
                    <p
                        className={css`
                            width: 80px;
                            text-align: center;
                        `}
                    >
                        메이플M Lv.{mobileLevel}
                    </p>
                    <Button
                        styles={css`
                            padding: 2px 0px;
                            width: 20px;
                        `}
                        onClick={increase}
                    >
                        {"+"}
                    </Button>
                </div>
                <Button onClick={addCharacterModal.openModal}>캐릭터 추가하기</Button>
                <Button onClick={addCharactersModal.openModal}>캐릭터 목록 추가하기</Button>
            </div>
            {addCharactersModal.isModalVisible && (
                <AddCharactersModal closeModal={addCharactersModal.closeModal}/>
            )}
            {addCharacterModal.isModalVisible && (
                <AddCharacterModal closeModal={addCharacterModal.closeModal}/>
            )}
        </div>
    );
}
