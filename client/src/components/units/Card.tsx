import { Button } from "#components/commons/Button";
import { BACKGROUND_COLOR, BORDER_COLOR, CARD_BUTTON_COLOR, SHADOW_COLOR, TEXT_COLOR } from "#constants/colors";
import { CARD_WIDTH } from "#constants/strings";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { JOB_NAME } from "#enums/job";
import useCharacterList from "#hooks/useCharacterList";
import { border, flex } from "#styles/mixin";
import { Character } from "#types/character";
import { getGradeFromCharacterLevel } from "#utils";
import { css } from "@emotion/css";
import { HTMLAttributes } from "react";
import { Tooltip } from "#components/commons/Tooltip";
import { Txt } from "#components/commons/Txt";
import useTooltip from "#hooks/useTooltip";
import { JOB_MAP } from "#constants/maps";

const gradeLabelOptions = {
    size: "28px",
    weight: 600,
    gradient: TEXT_COLOR.CARD_GRADE,
    border: {
        weight: "2px",
        color: TEXT_COLOR.BLACK,
    },
};

const levelLabelOptions = {
    size: "12px",
    weight: 600,
    color: TEXT_COLOR.GRAY,
};

const jobLabelOptions = {
    size: "10px",
    weight: 500,
    color: TEXT_COLOR.GRAY,
};

const nameLabelOptions = {
    size: "12px",
    weight: 600,
    color: TEXT_COLOR.GOLD,
};

const deleteButtonOptions = {
    color: CARD_BUTTON_COLOR.DELETE,
    image: "/icons/delete_icon.svg",
};

const refreshButtonOptions = {
    color: CARD_BUTTON_COLOR.PRIMARY,
    image: "/icons/refresh_icon.svg",
};

interface Props extends HTMLAttributes<HTMLDivElement> {
    character: Character;
}

export function Card({ character, ...props }: Props) {
    const { use, release, _delete, refresh } = useCharacterList();
    const { isTooltipVisible, showTooltip, hideTooltip, containerRef, tooltipPosition } = useTooltip();
    return (
        <>
            <div
                className={css`
                    position: relative;
                    ${flex({ direction: FLEX_DIRECTION.COLUMN, alignItems: ALIGN_ITEMS.CENTER })}
                    background: ${BACKGROUND_COLOR.CHARACTER_CARD};
                    ${border("2px", BORDER_COLOR.DARK_ORANGE, "10px")};
                    padding: 8px;
                    width: ${CARD_WIDTH};
                    max-width: 116px;
                    max-height: 175px;
                    box-shadow: ${`0px 4px 4px ${SHADOW_COLOR.TRANSPARENT}`};
                    cursor: pointer;
                    :hover {
                        transform: translateY(-2%);
                        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
                    }
                `}
                ref={containerRef}
                onClick={() => (character.isUsed ? release : use)(character.nickname)}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                {...props}
            >
                <div
                    className={css`
                        width: 100%;
                        ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.FLEX_START })};
                    `}
                >
                    <Txt.GradientTxt {...gradeLabelOptions} data-text={getGradeFromCharacterLevel}>
                        {getGradeFromCharacterLevel(character.level, character.job?.name === JOB_NAME.메이플M)}
                    </Txt.GradientTxt>
                    <Txt {...levelLabelOptions}>{`Lv.${character.level}`}</Txt>
                </div>
                <div
                    className={css`
                        height: 85px;
                        width: 100%;
                        background: url(${character.image ||
                            "https://ssl.nexon.com/s2/game/maplestory/renewal/common/no_char_img_180.png"})
                            no-repeat;
                        background-size: 150%;
                        background-position: -18px -46px;
                        margin-bottom: 2px;
                    `}
                />
                <Txt {...jobLabelOptions}>{character.job?.name ?? "???"}</Txt>
                <Txt {...nameLabelOptions}>{character.nickname}</Txt>
                <div
                    className={css`
                        ${flex({ justifyContent: JUSTIFY_CONTENT.CENTER, alignItems: ALIGN_ITEMS.CENTER })}
                        margin-top: 5px;
                        > * {
                            margin-left: 5px;
                        }
                    `}
                >
                    {character.image && (
                        <Button.IconButton
                            onClick={(e) => {
                                refresh(character);
                                e.stopPropagation();
                            }}
                            {...refreshButtonOptions}
                        ></Button.IconButton>
                    )}
                    {character.job?.name !== JOB_NAME.메이플M && (
                        <Button.IconButton
                            onClick={(e) => {
                                _delete(character.nickname);
                                e.stopPropagation();
                            }}
                            {...deleteButtonOptions}
                        ></Button.IconButton>
                    )}
                </div>
                {character.isUsed && (
                    <img
                        className={css`
                            width: 30px;
                            position: absolute;
                            left: 84px;
                            top: 26px;
                        `}
                        alt="using_icon"
                        src="/icons/using_icon.svg"
                    />
                )}
            </div>
            {isTooltipVisible && (
                <Tooltip position={tooltipPosition}>
                    {JOB_MAP[character.job?.name!].ability.toString(
                        character.job?.ability[getGradeFromCharacterLevel(character.level)] ?? 0
                    )}
                </Tooltip>
            )}
        </>
    );
}
