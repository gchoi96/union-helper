import { Button } from "#components/commons/Button";
import { Counter } from "#components/commons/Counter";
import { BACKGROUND_COLOR, BORDER_COLOR, SHADOW_COLOR, TEXT_COLOR } from "#constants/colors";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { BUTTON_TYPE } from "#enums/status";
import useBoard from "#hooks/useBoard";
import useCharacterList from "#hooks/useCharacterList";
import { flex } from "#styles/mixin";
import { css } from "@emotion/css";

export function MainControl() {
    const { getTotalLevel, getOccupiableSize, reset: resetCharacterList, getUnionGrade } = useCharacterList();
    const { getSelectedCount, reset: resetBoard } = useBoard();

    const onClickReset = () => {
        resetCharacterList();
        resetBoard();
    };

    return (
        <div
            className={css`
                ${flex({
                    direction: FLEX_DIRECTION.COLUMN,
                    alignItems: ALIGN_ITEMS.CENTER,
                    justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN,
                })}
                border-radius: 10px;
                border: 1px solid ${BORDER_COLOR.GRAY};
                background: ${BACKGROUND_COLOR.GRADIENT_GRAY};
                padding: 20px 30px;
                width: 390px;
                height: 432px;
            `}
        >
            <p
                className={css`
                    color: ${TEXT_COLOR.WHITE};
                    text-align: center;
                    text-shadow: 0 0 6px ${SHADOW_COLOR.UNION_GRADE};
                    font-size: 30px;
                    font-weight: 700;
                `}
            >
                {getUnionGrade().text}
            </p>
            <div
                className={css`
                    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })}
                    width:100%;
                    > * {
                        width: 40%;
                    }
                `}
            >
                <Counter>
                    <Counter.Title>점령 가능 지역</Counter.Title>
                    <Counter.Content>
                        {getSelectedCount()}/{getOccupiableSize()}
                    </Counter.Content>
                </Counter>
                <Counter>
                    <Counter.Title>TOTAL LEVEL</Counter.Title>
                    <Counter.Content>{String(getTotalLevel())}</Counter.Content>
                </Counter>
            </div>
            <div
                className={css`
                    > div {
                        ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })};
                        margin-top: 27px;
                        > :not(:first-child) {
                            margin-left: 27px;
                        }
                    }
                `}
            >
                <Button size="large" onClick={() => {}}>
                    점령지역 자동선택
                </Button>
                <div>
                    <Button size="large" type={BUTTON_TYPE.RED} onClick={onClickReset}>
                        초기화
                    </Button>
                    <Button size="large" type={BUTTON_TYPE.GREEN} onClick={() => {}}>
                        실행
                    </Button>
                </div>
            </div>
        </div>
    );
}
